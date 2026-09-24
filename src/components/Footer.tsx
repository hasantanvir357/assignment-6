import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0b] py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
      <div className="flex items-center gap-2 text-white font-bold">
        <Image src={logo} alt="FitLog Logo" width={20} height={20} className="w-5 h-5 object-contain" />
        <span>FITLOG</span>
      </div>
      <div>
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </div>
    </footer>
  );
}