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

      <div className="flex gap-2 text-sm font-semibold bg-zinc-900/50 p-1 rounded-full border border-zinc-800/80">
        <Link
          href="/"
          className={`px-4 py-1.5 rounded-full transition ${
            pathname === '/' ? 'bg-zinc-800 text-[#ccff00]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`px-4 py-1.5 rounded-full transition ${
            pathname === '/my-plan' ? 'bg-zinc-800 text-[#ccff00]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          My Plan
        </Link>
      </div>

      <Link href="/my-plan" className="flex items-center gap-4 text-xs font-bold text-zinc-300">
        <div className="flex items-center gap-1.5">
          <span>Plan</span>
          <span className="bg-[#ccff00] text-black w-5 h-5 rounded-full flex items-center justify-center font-extrabold text-[11px]">
            0
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Saved</span>
          <span className="border border-zinc-700 text-zinc-300 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]">
            0
          </span>
        </div>
      </Link>
    </nav>
  );
}
