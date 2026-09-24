import Image from 'next/image';
import banner from '@/assets/banner.png';

export default function Hero() {
  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <div className="bg-[#14151a] border border-zinc-800/80 rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#ccff00] uppercase">WORKOUT LIBRARY</span>

          <h1 className="font-(family-name:--font-oswald) text-4xl md:text-6xl font-extrabold my-4 uppercase tracking-normal leading-none text-white">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm mb-6 max-w-md leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s
            work add up.
          </p>
          <a
            href="#library"
            className="inline-block bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-lg text-xs hover:opacity-90 transition uppercase tracking-wider"
          >
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md overflow-hidden">
            <Image
              src={banner}
              alt="Workout Banner"
              width={500}
              height={350}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
