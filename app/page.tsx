'use client';

import React, { useState } from 'react';

export default function ListingStudioDashboard() {
  const [marketplace, setMarketplace] = useState('amazon');
  const [brand, setBrand] = useState('Ethletico');
  const [productName, setProductName] = useState('Collapsible Silicone Water Bottle');
  const [category, setCategory] = useState('Sports & Outdoors');
  const [targetCountry, setTargetCountry] = useState('US');
  const [features, setFeatures] = useState('BPA free food-grade silicone, Collapsible ball shape, Leakproof twist cap, 500ml capacity, Lightweight for hiking & gym');
  const [keywords, setKeywords] = useState('sports water bottle, collapsible bottle, gym bottle, travel water bottle');
  const [competitors, setCompetitors] = useState('HydraPak, Nalgene');

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketplace,
          brand,
          productName,
          category,
          targetCountry,
          features: features.split(',').map((f) => f.trim()).filter(Boolean),
          keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
          competitors: competitors.split(',').map((c) => c.trim()).filter(Boolean),
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Generation failed');
      }
      setOutput(resData.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem', maxWidth: '1100px', margin: '0 auto', color: '#1f2937' }}>
      <header style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.25rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', margin: 0 }}>GTX Listing Studio AI</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.95rem' }}>AI Multi-Marketplace Listing & SEO Optimization Engine</p>
        </div>
        <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.75rem', fontWeight: '700', padding: '0.35rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
          SaaS Beta v1.0
        </span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
        {/* Input Form */}
        <div style={{ background: '#f9fafb', padding: '1.75rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem', color: '#111827' }}>Product Information</h2>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Target Marketplace</label>
              <select
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', background: '#fff', fontSize: '0.9rem' }}
              >
                <option value="amazon">Amazon</option>
                <option value="walmart">Walmart</option>
                <option value="etsy">Etsy</option>
                <option value="shopify">Shopify</option>
                <option value="ebay">eBay</option>
                <option value="noon">Noon</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Country</label>
                <input
                  type="text"
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Key Features (comma separated)</label>
              <textarea
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Target Keywords (comma separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Competitors (optional)</label>
              <input
                type="text"
                value={competitors}
                onChange={(e) => setCompetitors(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#93c5fd' : '#2563eb',
                color: '#fff',
                padding: '0.8rem',
                borderRadius: '0.375rem',
                fontWeight: '700',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem',
                transition: 'background 0.2s',
              }}
            >
              {loading ? 'Generating Listing with AI...' : `Generate ${marketplace.toUpperCase()} Listing`}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem', color: '#111827' }}>Optimized Output</h2>

          {error && (
            <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '0.375rem', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!output && !loading && !error && (
            <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Ready to generate your listing</p>
              <p style={{ fontSize: '0.875rem' }}>Select a marketplace and click generate to build your SEO listing.</p>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem', color: '#2563eb' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Crafting high-converting copy...</p>
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Optimizing title, bullet points, backend keywords & SEO score.</p>
            </div>
          )}

          {output && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#166534' }}>SEO Score: {output.seoScore}/100</span>
                <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: '600' }}>Marketplace: {marketplace.toUpperCase()}</span>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Optimized Product Title</h3>
                <div style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #e5e7eb', fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>
                  {output.productTitle}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Key Feature Bullet Points</h3>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
                  {output.bulletPoints?.map((bp: string, idx: number) => (
                    <li key={idx}>{bp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Product Description</h3>
                <div style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', whiteSpace: 'pre-line', color: '#374151' }}>
                  {output.description}
                </div>
              </div>

              {output.backendKeywords && output.backendKeywords.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Backend Search Terms / Tags</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {output.backendKeywords.map((kw: string, idx: number) => (
                      <span key={idx} style={{ background: '#f3f4f6', color: '#1f2937', fontSize: '0.8rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #e5e7eb' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
