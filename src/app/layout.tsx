import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Well Nest Marketing Portal',
  description: 'Faith-community intelligence, content planning, and retreat funnel tracking for Well Nest.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
