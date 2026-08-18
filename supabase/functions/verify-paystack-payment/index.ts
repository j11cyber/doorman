import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface VerifyPayload {
  reference?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      console.error("Missing PAYSTACK_SECRET_KEY environment variable");
      return new Response(
        JSON.stringify({ success: false, paymentStatus: "failed", error: "Server payment configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let reference: string | undefined;

    if (req.method === "POST") {
      const body: VerifyPayload = await req.json().catch(() => ({}));
      reference = body.reference;
    } else if (req.method === "GET") {
      const url = new URL(req.url);
      reference = url.searchParams.get("reference") ?? undefined;
    }

    if (!reference) {
      return new Response(
        JSON.stringify({ success: false, paymentStatus: "failed", error: "Transaction reference is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Verify transaction status with Paystack API
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await paystackResponse.json();

    const isPaid =
      paystackData.status === true &&
      paystackData.data?.status === "success";

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (isPaid) {
      // 2. Update order in database to 'paid'
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          paystack_reference: reference,
          updated_at: new Date().toISOString(),
        })
        .or(`order_number.eq.${reference},paystack_reference.eq.${reference}`);

      if (updateError) {
        console.error("Failed to update order payment status:", updateError);
      }

      // 3. Return exact shape expected by order-success/page.tsx: { success: true, paymentStatus: 'paid' }
      return new Response(
        JSON.stringify({
          success: true,
          paymentStatus: "paid",
          data: paystackData.data,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      // Payment did not succeed or is abandoned/pending
      const payStatus = paystackData.data?.status || "failed";

      if (payStatus === "failed" || payStatus === "abandoned") {
        await supabase
          .from("orders")
          .update({
            payment_status: "failed",
            updated_at: new Date().toISOString(),
          })
          .or(`order_number.eq.${reference},paystack_reference.eq.${reference}`);
      }

      return new Response(
        JSON.stringify({
          success: false,
          paymentStatus: payStatus,
          error: paystackData.message || "Payment verification failed or was not completed.",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("verify-paystack-payment error:", errMessage);

    return new Response(
      JSON.stringify({
        success: false,
        paymentStatus: "failed",
        error: errMessage,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
