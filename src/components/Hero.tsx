import Image from 'next/image';
import banner from '@/assets/banner.png';

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center py-12 border-b border-zinc-800 px-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#ccff00] uppercase">WORKOUT LIBRARY</span>
        <h1 className="text-4xl md:text-5xl font-bold my-4 uppercase tracking-tight leading-tight text-white">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-zinc-400 text-sm mb-6 max-w-md">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work
          add up.
        </p>
        <a
          href="#library"
          className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded text-sm hover:opacity-90 transition"
        >
          BROWSE WORKOUTS
        </a>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-2">
          <Image
            src={banner}
            alt="Workout Banner"
            width={500}
            height={300}
            className="w-full h-auto object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
