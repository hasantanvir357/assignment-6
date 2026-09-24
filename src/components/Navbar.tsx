'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-[#0f0f10] sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src={logo} alt="FITLOG Logo" width={32} height={32} className="h-8 w-8 object-contain" priority />
        <span className="text-xl font-bold tracking-wider text-white">FITLOG</span>
      </Link>

      <div className="flex gap-6 text-sm font-semibold">
        <Link href="/" className={pathname === '/' ? 'text-[#ccff00]' : 'text-zinc-400 hover:text-white transition'}>
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={pathname === '/my-plan' ? 'text-[#ccff00]' : 'text-zinc-400 hover:text-white transition'}
        >
          My Plan
        </Link>
      </div>

      <Link href="/my-plan" className="flex items-center gap-3">
        <span className="bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold">Plan 0</span>
        <span className="border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-xs font-bold">Saved 0</span>
      </Link>
    </nav>
  );
}
