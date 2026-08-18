-- ==============================================================================
-- THE DOORMAN — REVISED SECURE SUPABASE DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLE: public.customers
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes on customers
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers (email);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON public.customers (created_at DESC);

-- ==============================================================================
-- 3. TABLE: public.orders
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    order_number TEXT NOT NULL UNIQUE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'NGN',
    payment_method TEXT NOT NULL, -- 'bank_transfer', 'paystack'
    payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'cancelled'
    notes TEXT,
    paystack_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes on orders
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders (order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders (customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders (payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

-- ==============================================================================
-- 4. AUTOMATIC TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_customers_updated_at ON public.customers;
CREATE TRIGGER set_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on both tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Customers RLS Policies
-- ------------------------------------------------------------------------------

-- Service Role (Edge Functions & Admin scripts) has full access
CREATE POLICY "Service role full access on customers"
    ON public.customers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow anonymous & authenticated users to insert customer records during checkout
CREATE POLICY "Allow public customer insertion"
    ON public.customers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- NOTE ON CUSTOMER SELECT:
-- Direct public SELECT on customers is completely disabled.
-- Customer PII (emails, phone numbers, addresses) cannot be queried or scraped by anonymous users.

-- ------------------------------------------------------------------------------
-- Orders RLS Policies
-- ------------------------------------------------------------------------------

-- Service Role (Edge Functions & Admin scripts) has full access
CREATE POLICY "Service role full access on orders"
    ON public.orders
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow public users to insert orders at checkout (e.g. Bank Transfer submission)
CREATE POLICY "Allow public order creation"
    ON public.orders
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- NOTE ON ORDERS SELECT:
-- Direct public SELECT on the orders table is completely disabled.
-- Malicious actors cannot run `SELECT * FROM orders` to dump order history or financials.

-- ==============================================================================
-- 6. SECURE SAFE ORDER STATUS LOOKUP FUNCTION (RPC)
-- ==============================================================================
-- This security definer function allows looking up a specific order by its exact
-- order reference without opening up generic table scan permissions.

CREATE OR REPLACE FUNCTION public.get_order_status(p_order_number TEXT)
RETURNS TABLE (
    order_number TEXT,
    payment_status TEXT,
    payment_method TEXT,
    currency TEXT,
    total NUMERIC,
    created_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT
        o.order_number,
        o.payment_status,
        o.payment_method,
        o.currency,
        o.total,
        o.created_at
    FROM public.orders o
    WHERE o.order_number = p_order_number
    LIMIT 1;
$$;

-- Grant execution to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.get_order_status(TEXT) TO anon, authenticated, service_role;
