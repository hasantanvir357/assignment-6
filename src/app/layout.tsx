import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'FITLOG — Workout Library',
  description: 'Train hard, log honest.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <body className="bg-[#0f0f10] text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}