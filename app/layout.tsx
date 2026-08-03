import React from 'react';

export const metadata = {
  title: 'GTX Listing Studio AI',
  description: 'AI Multi-Marketplace Listing & SEO Optimization Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}
