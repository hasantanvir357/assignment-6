'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleWorkout } from '@/lib/workouts';
import { useWorkout } from '@/context/WorkoutContext';
import Link from 'next/link';

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = useWorkout();

  useEffect(() => {
    if (id) {
      getSingleWorkout(id).then((data) => {
        setWorkout(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-zinc-500 font-medium">Loading details...</div>;
  }

  if (!workout) {
    return <div className="text-center py-20 text-zinc-500 font-medium">Workout not found!</div>;
  }

  const title = workout.title || workout.name || 'UNTITLED WORKOUT';
  const description =
    workout.description ||
    'A compound movement that builds upper body strength, targeting major muscle groups with controlled power.';
  const equipment = workout.equipment || 'Bodyweight';
  const difficulty = workout.difficulty || 'Intermediate';
  const sets = workout.sets || '4';
  const reps = workout.reps || '6-8';
  const rating = workout.rating || 4.8;

  let categories: string[] = workout.category || workout.categories || [];
  if (typeof categories === 'string') {
    categories = (categories as string).split(',').map((c) => c.trim());
  }

  const durationRaw = workout.duration || workout.time || '';
  const durationText = durationRaw
    ? durationRaw.toString().includes('min')
      ? durationRaw
      : `${durationRaw} min`
    : '25 min';

  const caloriesRaw = workout.calories || workout.calorie || workout.caloriesBurned || '';
  const caloriesText = caloriesRaw
    ? caloriesRaw.toString().includes('kcal')
      ? caloriesRaw
      : `${caloriesRaw} kcal`
    : '180 kcal';

  const instructions: string[] = workout.instructions || [
    'Lie on the bench with eyes under the bar and feet planted.',
    'Unrack with locked elbows and lower the bar to mid-chest.',
    'Press up in a slight arc until elbows lock without bouncing.',
    'Keep shoulder blades pinched and a natural arch in the back.',
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#ccff00] mb-8 transition uppercase tracking-wider"
      >
        ← BACK TO LIBRARY
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-[#14151a] border border-zinc-800/80 rounded-3xl overflow-hidden p-2">
          <img
            src={workout.image || '/placeholder.png'}
            alt={title}
            className="w-full h-auto max-h-[520px] object-cover rounded-2xl"
          />
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-extrabold uppercase text-white tracking-wider mb-3 leading-none">
            {title}
          </h1>

          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-medium">{description}</p>

          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.length > 0 ? (
              categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black text-[11px] font-black px-3 py-1 rounded-md uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))
            ) : (
              <>
                <span className="bg-[#ccff00] text-black text-[11px] font-black px-3 py-1 rounded-md uppercase tracking-wider">
                  CHEST
                </span>
                <span className="bg-[#ccff00] text-black text-[11px] font-black px-3 py-1 rounded-md uppercase tracking-wider">
                  ARMS
                </span>
              </>
            )}
          </div>

          <div className="bg-[#14151a]/80 border border-zinc-800/80 rounded-2xl overflow-hidden mb-8">
            <div className="divide-y divide-zinc-800/60 text-xs">
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">EQUIPMENT</span>
                <span className="text-white font-semibold">{equipment}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">DIFFICULTY</span>
                <span className="text-white font-semibold">{difficulty}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">SETS</span>
                <span className="text-white font-semibold">{sets}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">REPS</span>
                <span className="text-white font-semibold">{reps}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">DURATION</span>
                <span className="text-white font-semibold">{durationText}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">CALORIES</span>
                <span className="text-white font-semibold">{caloriesText}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">RATING</span>
                <span className="text-white font-semibold">{rating}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-xs uppercase text-zinc-300 mb-3 tracking-wider">INSTRUCTIONS</h3>
            <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-400 leading-relaxed font-medium">
              {instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToPlan(workout)}
              className="bg-[#ccff00] text-black hover:bg-[#b3e600] text-xs font-black uppercase tracking-wider py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📅</span> Add to today's plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="bg-transparent border border-zinc-700/80 hover:bg-zinc-800/60 text-white text-xs font-black uppercase tracking-wider py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔖</span> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
