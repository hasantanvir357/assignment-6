import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { Toaster } from 'react-hot-toast';

// Google Fonts Configuration
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FITLOG — Workout Library',
  description: 'Train hard, log honest.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`dark ${oswald.variable} ${inter.variable}`}>
      <body className="bg-[#0f0f10] text-white min-h-screen flex flex-col justify-between font-sans antialiased">
        <WorkoutProvider>
          {/* Top-Right Positioned Dark Toast */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#14151a',
                color: '#fff',
                border: '1px solid #3f3f46',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
              },
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
