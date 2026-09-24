'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWorkout } from '@/context/WorkoutContext';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedWorkouts } = useWorkout();

  return (
    <nav className="border-b border-zinc-800/80 bg-[#0f0f10]/90 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src={logo} alt="FITLOG Logo" width={28} height={28} className="object-contain" priority />
        <span className="font-[family-name:var(--font-oswald)] text-xl font-bold tracking-wider text-white">FITLOG</span>
      </Link>

      <div className="flex bg-[#14151a] p-1 rounded-full border border-zinc-800">
        <Link
          href="/"
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
            pathname === '/' ? 'bg-zinc-800 text-[#ccff00]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
            pathname === '/my-plan' ? 'bg-zinc-800 text-[#ccff00]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          My Plan
        </Link>
      </div>

      <Link href="/my-plan" className="flex items-center gap-4 text-xs font-bold">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">Plan</span>
          <span className="bg-[#ccff00] text-black text-[11px] font-black px-2 py-0.5 rounded-full">
            {todaysPlan.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">Saved</span>
          <span className="border border-zinc-700 text-zinc-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
            {savedWorkouts.length}
          </span>
        </div>
      </Link>
    </nav>
  );
}