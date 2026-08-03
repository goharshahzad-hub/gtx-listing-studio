-- Supabase Schema for GTX Listing Studio SaaS

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users / Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    company_name TEXT,
    subscription_tier TEXT DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'growth', 'enterprise')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products Master Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    product_name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT,
    features TEXT[] DEFAULT '{}',
    target_country TEXT DEFAULT 'US',
    target_keywords TEXT[] DEFAULT '{}',
    competitors TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Generated Listings Table
CREATE TABLE IF NOT EXISTS public.generated_listings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    marketplace TEXT NOT NULL CHECK (marketplace IN ('amazon', 'walmart', 'etsy', 'shopify', 'ebay', 'noon')),
    product_title TEXT NOT NULL,
    bullet_points JSONB DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    backend_keywords TEXT[] DEFAULT '{}',
    seo_score INT CHECK (seo_score BETWEEN 0 AND 100),
    meta_title TEXT,
    meta_description TEXT,
    image_suggestions TEXT[] DEFAULT '{}',
    alt_text TEXT[] DEFAULT '{}',
    faqs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_listings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own products" ON public.products FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own listings" ON public.generated_listings FOR ALL USING (auth.uid() = user_id);
