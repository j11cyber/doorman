import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CustomerPayload {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
}

interface OrderPayload {
  items: unknown[];
  subtotal: number;
  total: number;
  currency: string;
  paymentMethod: string;
  notes?: string;
}

interface RequestBody {
  customerData: CustomerPayload;
  orderData: OrderPayload;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      console.error("Missing PAYSTACK_SECRET_KEY environment variable");
      return new Response(
        JSON.stringify({ success: false, error: "Server payment configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: RequestBody = await req.json();
    const { customerData, orderData } = body;

    if (!customerData || !orderData) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request payload: customerData and orderData are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!customerData.email || !customerData.fullName || !orderData.total) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields: email, fullName, and total are mandatory" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Insert customer record using Service Role (bypassing public RLS safely)
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        email: customerData.email,
        full_name: customerData.fullName,
        phone: customerData.phone || "",
        address: customerData.address || "",
        city: customerData.city || "",
        state: customerData.state || "",
      })
      .select()
      .maybeSingle();

    if (customerError) {
      console.error("Customer insert error:", customerError);
    }

    // 2. Generate unique order reference matching frontend format
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // 3. Insert order record
    const { error: orderError } = await supabase.from("orders").insert({
      customer_id: customer?.id ?? null,
      order_number: orderNumber,
      items: orderData.items || [],
      subtotal: orderData.subtotal || orderData.total,
      total: orderData.total,
      currency: orderData.currency || "NGN",
      payment_method: "paystack",
      payment_status: "pending",
      notes: orderData.notes || customerData.notes || null,
      paystack_reference: orderNumber,
    });

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw new Error(`Failed to record order: ${orderError.message}`);
    }

    // 4. Initialize transaction with Paystack API
    // Paystack amounts are in the lowest currency unit (Kobo for NGN -> multiply by 100)
    const amountInKobo = Math.round(orderData.total * 100);

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customerData.email,
        amount: amountInKobo,
        currency: orderData.currency || "NGN",
        reference: orderNumber,
        metadata: {
          order_number: orderNumber,
          customer_name: customerData.fullName,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
          state: customerData.state,
          custom_fields: [
            {
              display_name: "Order Number",
              variable_name: "order_number",
              value: orderNumber,
            },
          ],
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || !paystackData.data?.authorization_url) {
      console.error("Paystack initialization failed:", paystackData);
      throw new Error(paystackData.message || "Failed to initialize payment gateway transaction");
    }

    // 5. Return exact shape expected by checkout/page.tsx: { success: true, paymentUrl: "..." }
    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: paystackData.data.authorization_url,
        reference: orderNumber,
        accessCode: paystackData.data.access_code,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("create-paystack-payment error:", errMessage);

    return new Response(
      JSON.stringify({
        success: false,
        error: errMessage,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
