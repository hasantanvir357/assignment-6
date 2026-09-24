import Link from 'next/link';
import Image from 'next/image';
import { Workout } from '@/types';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#14151a] border border-zinc-800 hover:border-zinc-700 transition rounded-xl p-4 flex flex-col justify-between h-full group">
        <div>
          <div className="h-48 bg-zinc-900 rounded-lg mb-4 overflow-hidden relative">
            <Image
              src={workout.image || '/placeholder.png'}
              alt={workout.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>

          <div className="flex gap-2 mb-2 flex-wrap">
            {workout.category?.map((cat) => (
              <span
                key={cat}
                className="bg-zinc-800 text-[10px] px-2.5 py-0.5 rounded text-zinc-300 font-semibold uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-extrabold text-base uppercase mb-1 text-white group-hover:text-[#ccff00] transition">
            {workout.title}
          </h3>
          <p className="text-xs text-zinc-400 mb-4">{workout.equipment}</p>
        </div>

        <div className="flex justify-between items-center text-xs text-zinc-400 border-t border-zinc-800/80 pt-3 font-medium">
          <span>⏱ {workout.duration}</span>
          <span>🔥 {workout.calories}</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
