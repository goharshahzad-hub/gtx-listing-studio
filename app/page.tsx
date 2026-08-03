'use client';

import React, { useState } from 'react';

export default function ListingStudioDashboard() {
  const [marketplace, setMarketplace] = useState('etsy');
  const [brand, setBrand] = useState('Ethletico');
  const [productName, setProductName] = useState('Collapsible Silicone Water Bottle');
  const [category, setCategory] = useState('Gifts & Accessories');
  const [targetCountry, setTargetCountry] = useState('US');
  const [features, setFeatures] = useState('BPA free food-grade silicone, Collapsible foldable design, Leakproof twist cap, 500ml capacity, Lightweight for travel & gym');
  const [keywords, setKeywords] = useState('collapsible bottle, sports gift, gym water bottle, eco friendly gift, travel flask');
  const [competitors, setCompetitors] = useState('HydraPak, Nalgene');
  const [currentListingUrl, setCurrentListingUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
          currentListingUrl: currentListingUrl.trim() || undefined,
          imageUrl: imageUrl.trim() || undefined,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Generation failed');
      }
      setOutput(resData.data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem', maxWidth: '1150px', margin: '0 auto', color: '#1f2937' }}>
      <header style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.25rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', margin: 0 }}>GTX Listing Studio AI</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.95rem' }}>AI Multi-Marketplace SEO & Listing Generator (Etsy 13 Tags, Amazon, Walmart, Shopify, eBay, Noon)</p>
        </div>
        <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.75rem', fontWeight: '700', padding: '0.35rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
          SaaS Beta v1.2
        </span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem' }}>
        {/* Input Form */}
        <div style={{ background: '#f9fafb', padding: '1.75rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem', color: '#111827' }}>Product Information</h2>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Target Marketplace</label>
              <select
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', background: '#fff', fontSize: '0.9rem', fontWeight: '600' }}
              >
                <option value="etsy">Etsy (With 13 Tags Generator)</option>
                <option value="amazon">Amazon</option>
                <option value="walmart">Walmart</option>
                <option value="shopify">Shopify</option>
                <option value="ebay">eBay</option>
                <option value="noon">Noon</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Brand Name</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>Target Country</label>
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

            {/* Current Listing URL Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>
                Current Listing URL <span style={{ color: '#6b7280', fontWeight: 'normal' }}>(Optional - for audit/rewrite)</span>
              </label>
              <input
                type="url"
                placeholder="https://www.etsy.com/listing/..."
                value={currentListingUrl}
                onChange={(e) => setCurrentListingUrl(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
              />
            </div>

            {/* Product Image URL Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#374151' }}>
                Product Image URL <span style={{ color: '#6b7280', fontWeight: 'normal' }}>(Optional - for visual AI context)</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/product-image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
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
              {loading ? 'Performing SEO Research & Generating...' : `Generate ${marketplace.toUpperCase()} Listing`}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem', color: '#111827' }}>Optimized Output & SEO Essentials</h2>

          {error && (
            <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '0.375rem', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!output && !loading && !error && (
            <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Ready to generate your listing</p>
              <p style={{ fontSize: '0.875rem' }}>Select a marketplace and click generate to perform SEO research and build your listing essentials.</p>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem', color: '#2563eb' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Analyzing search volume & competitor keywords...</p>
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Building 13 long-tail Etsy tags, high-converting copy, and SEO essentials.</p>
            </div>
          )}

          {output && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#166534' }}>SEO Score: {output.seoScore}/100</span>
                <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: '600' }}>Marketplace: {marketplace.toUpperCase()}</span>
              </div>

              {/* Etsy 13 Tags Section */}
              {marketplace.toLowerCase() === 'etsy' && output.etsyTags && (
                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '1rem', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#9a3412', fontWeight: '800', margin: 0 }}>
                      Etsy Essentials: All 13 Long-Tail Search Tags ({output.etsyTags.length}/13)
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {output.etsyTags.map((tag: string, idx: number) => (
                      <span key={idx} style={{ background: '#ffedd5', color: '#9a3412', fontSize: '0.8rem', fontWeight: '600', padding: '0.3rem 0.6rem', borderRadius: '0.375rem', border: '1px solid #fdba74' }}>
                        #{idx + 1}: {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Research Summary */}
              {output.seoResearchSummary && (
                <div>
                  <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>SEO Research & Search Intent Strategy</h3>
                  <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #bfdbfe', fontSize: '0.875rem', color: '#1e40af' }}>
                    {output.seoResearchSummary}
                  </div>
                </div>
              )}

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
                  <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Backend Search Terms</h3>
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
