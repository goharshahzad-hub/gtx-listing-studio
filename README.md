# GTX Listing Studio AI — SaaS Foundation

**GTX Listing Studio AI** is an AI-powered multi-marketplace listing & SEO optimization engine designed for **Amazon, Walmart, Etsy, Shopify, eBay, and Noon**.

---

## 📁 Project Architecture

```
listing-studio-saas/
├── schema.sql              # Supabase PostgreSQL schema with RLS policies
├── package.json            # Dependencies for Next.js 14, React 18 & Supabase
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── .env.example            # Environment variables placeholder
├── test_studio.py          # Standalone Python engine demo script
├── lib/
│   ├── prompts.ts          # System/User prompt templates & JSON schemas per marketplace
│   └── generator.ts        # OpenAI completion caller & output parser
└── app/
    ├── page.tsx            # Interactive React frontend dashboard UI
    └── api/
        └── generate/
            └── route.ts    # REST API Endpoint (POST /api/generate)
```

---

## 🚀 Quick Start Guide

### 1. Environment Setup
Copy `.env.example` to `.env.local` and add your OpenAI API key and Supabase details:
```bash
cp .env.example .env.local
```

### 2. Database Migration (Supabase)
1. Log into your [Supabase Dashboard](https://supabase.com).
2. Create a new project.
3. Open the **SQL Editor** tab and execute the code inside `schema.sql`.

### 3. Deploy to Vercel
1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the environment variables (`OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Click **Deploy**.

---

## ⚡ Local Python Engine Demo
You can test the listing generation logic offline using the included Python script:
```bash
python3 test_studio.py amazon
python3 test_studio.py walmart
python3 test_studio.py etsy
```
