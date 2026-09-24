import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="bg-[#14151a] border border-zinc-800/90 p-8 md:p-12 rounded-3xl max-w-lg w-full flex flex-col items-center shadow-2xl">
        <h1 className="font-[family-name:var(--font-oswald)] text-7xl md:text-8xl font-black text-[#ccff00] tracking-wider mb-2">
          404
        </h1>
        <span className="bg-zinc-800 text-zinc-300 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest mb-4">
          PAGE NOT FOUND
        </span>
        <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase text-white mb-3">
          YOU'VE STRAYED OFF THE ROUTINE
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed mb-8">
          The page or exercise you are looking for doesn't exist or has been moved to another set.
        </p>
        <Link
          href="/"
          className="bg-[#ccff00] text-black hover:bg-[#b3e600] text-xs font-black uppercase tracking-wider py-3.5 px-8 rounded-xl transition duration-200"
        >
          BACK TO WORKOUTS
        </Link>
      </div>
    </div>
  );
}
