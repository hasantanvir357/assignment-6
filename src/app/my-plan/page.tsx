'use client';

import { useState, useEffect, Suspense } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

function MyPlanContent() {
  const { todaysPlan, savedWorkouts, removeFromPlan, removeFromSaved, addToPlan } = useWorkout();
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');

  useEffect(() => {
    if (tabQuery === 'saved') {
      setActiveTab('saved');
    } else {
      setActiveTab('today');
    }
  }, [tabQuery]);

  const currentList = activeTab === 'today' ? todaysPlan : savedWorkouts;

  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((acc, item: any) => {
    const min = parseInt((item.duration || item.time || '0').toString().replace(/\D/g, ''), 10);
    return acc + (isNaN(min) ? 0 : min);
  }, 0);

  const totalCalories = todaysPlan.reduce((acc, item: any) => {
    const cal = parseInt((item.calories || item.calorie || '0').toString().replace(/\D/g, ''), 10);
    return acc + (isNaN(cal) ? 0 : cal);
  }, 0);

  const handleMarkAsDone = (id: string, title: string) => {
    removeFromPlan(id);
    toast.success(`Completed "${title}"! Great job! 🎉`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-extrabold uppercase text-white tracking-wider mb-1">
        MY PLAN
      </h1>
      <p className="text-xs text-zinc-400 mb-8">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-[#14151a] border border-zinc-800/80 p-5 rounded-2xl text-center">
          <div className="text-3xl font-extrabold text-[#ccff00] mb-1">{totalExercises}</div>
          <div className="text-[10px] text-zinc-500 uppercase font-black tracking-wider">EXERCISES</div>
        </div>
        <div className="bg-[#14151a] border border-zinc-800/80 p-5 rounded-2xl text-center">
          <div className="text-3xl font-extrabold text-white mb-1">{totalMinutes}</div>
          <div className="text-[10px] text-zinc-500 uppercase font-black tracking-wider">MINUTES</div>
        </div>
        <div className="bg-[#14151a] border border-zinc-800/80 p-5 rounded-2xl text-center">
          <div className="text-3xl font-extrabold text-white mb-1">{totalCalories}</div>
          <div className="text-[10px] text-zinc-500 uppercase font-black tracking-wider">CALORIES</div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-zinc-800 mb-8">
        <button
          onClick={() => setActiveTab('today')}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition relative cursor-pointer ${
            activeTab === 'today' ? 'text-[#ccff00]' : 'text-zinc-500 hover:text-white'
          }`}
        >
          TODAY'S PLAN ({todaysPlan.length})
          {activeTab === 'today' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition relative cursor-pointer ${
            activeTab === 'saved' ? 'text-[#ccff00]' : 'text-zinc-500 hover:text-white'
          }`}
        >
          SAVED ({savedWorkouts.length})
          {activeTab === 'saved' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />}
        </button>
      </div>

      {currentList.length === 0 ? (
        <div className="text-center py-20 bg-[#14151a]/50 rounded-2xl border border-zinc-800/80">
          <h3 className="font-bold text-base uppercase text-white mb-1">NOTHING HERE YET</h3>
          <p className="text-xs text-zinc-400 mb-6">
            {activeTab === 'today'
              ? 'Browse the library and add a lift to get today moving.'
              : 'You have no saved workouts for later.'}
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-xl hover:bg-[#b3e600] transition"
          >
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item: any) => (
            <div
              key={item.id}
              className="bg-[#14151a] border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.title || item.name}
                  className="w-16 h-16 object-cover rounded-xl bg-zinc-900"
                />
                <div>
                  <h4 className="font-bold text-sm uppercase text-white font-[family-name:var(--font-oswald)] tracking-wide">
                    {item.title || item.name}
                  </h4>
                  <p className="text-xs text-zinc-500">{item.equipment || 'Bodyweight'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href={`/workout/${item.id}`}
                  className="p-2 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs"
                >
                  👁️
                </Link>

                {activeTab === 'today' ? (
                  <>
                    <button
                      onClick={() => handleMarkAsDone(item.id, item.title || item.name || 'Workout')}
                      className="p-2 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      ✓ Done
                    </button>
                    <button
                      onClick={() => removeFromPlan(item.id)}
                      className="p-2 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => addToPlan(item)}
                      className="p-2 bg-[#ccff00] text-black hover:bg-[#b3e600] rounded-lg text-xs font-bold cursor-pointer"
                    >
                      + Add to Plan
                    </button>
                    <button
                      onClick={() => removeFromSaved(item.id)}
                      className="p-2 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500 font-medium">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}
