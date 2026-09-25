'use client';

import { useState, Suspense } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

type WorkoutItem = {
  id: string;
  title?: string;
  name?: string;
  image?: string;
  equipment?: string;
  duration?: string | number;
  time?: string | number;
  calories?: string | number;
  calorie?: string | number;
  caloriesBurned?: string | number;
  rating?: string | number;
};

function MyPlanContent() {
  const { todaysPlan, savedWorkouts, removeFromPlan, removeFromSaved, addToPlan } = useWorkout();
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');

  const [selectedTab, setSelectedTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  const activeTab = tabQuery === 'saved' ? 'saved' : selectedTab;

  const currentList = (activeTab === 'today' ? todaysPlan : savedWorkouts) as WorkoutItem[];

  const extractNumber = (val: unknown): number => {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    const parsed = parseInt(val.toString().replace(/\D/g, ''), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      return extractNumber(a.duration || a.time) - extractNumber(b.duration || b.time);
    }
    if (sortBy === 'calories') {
      return (
        extractNumber(b.calories || b.calorie || b.caloriesBurned) -
        extractNumber(a.calories || a.calorie || a.caloriesBurned)
      );
    }
    if (sortBy === 'rating') {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }
    return 0;
  });

  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((acc, item: WorkoutItem) => {
    const min = extractNumber(item.duration || item.time);
    return acc + min;
  }, 0);

  const totalCalories = todaysPlan.reduce((acc, item: WorkoutItem) => {
    const cal = extractNumber(item.calories || item.calorie || item.caloriesBurned);
    return acc + cal;
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800/80 pb-3 mb-8 gap-4">
        <div className="flex gap-6">
          <button
            onClick={() => setSelectedTab('today')}
            className={`text-xs font-black uppercase tracking-wider transition relative pb-3 cursor-pointer ${
              activeTab === 'today' ? 'text-[#ccff00]' : 'text-zinc-500 hover:text-white'
            }`}
          >
            TODAY'S PLAN ({todaysPlan.length})
            {activeTab === 'today' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />}
          </button>
          <button
            onClick={() => setSelectedTab('saved')}
            className={`text-xs font-black uppercase tracking-wider transition relative pb-3 cursor-pointer ${
              activeTab === 'saved' ? 'text-[#ccff00]' : 'text-zinc-500 hover:text-white'
            }`}
          >
            SAVED ({savedWorkouts.length})
            {activeTab === 'saved' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
            className="select select-bordered select-xs bg-[#14151a] text-white border-zinc-700/80 focus:border-[#ccff00] rounded-lg px-3 py-1 text-xs"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
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
          {sortedList.map((item) => {
            const durationVal = extractNumber(item.duration || item.time) || 15;
            const caloriesVal = extractNumber(item.calories || item.calorie || item.caloriesBurned) || 120;
            const ratingVal = item.rating || 4.5;

            return (
              <div
                key={item.id}
                className="bg-[#14151a] border border-zinc-800/90 hover:border-zinc-700 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.title || item.name}
                    className="w-20 h-16 object-cover rounded-xl bg-zinc-900 border border-zinc-800/80"
                  />
                  <div>
                    <h4 className="font-bold text-base uppercase text-white font-[family-name:var(--font-oswald)] tracking-wide">
                      {item.title || item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mb-1.5">{item.equipment || 'Bodyweight'}</p>

                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                      <span className="flex items-center gap-1">🕒 {durationVal} min</span>
                      <span className="flex items-center gap-1">🔥 {caloriesVal} kcal</span>
                      <span className="flex items-center gap-1 text-zinc-300">⭐ {ratingVal}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2 bg-zinc-800/70 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition"
                  >
                    View Details
                  </Link>

                  {activeTab === 'today' ? (
                    <>
                      <button
                        onClick={() => handleMarkAsDone(item.id, item.title || item.name || 'Workout')}
                        className="px-4 py-2 bg-[#ccff00] hover:bg-[#b3e600] text-black rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#ccff00]/10"
                      >
                        ✓ Mark as Done
                      </button>

                      <button
                        onClick={() => removeFromPlan(item.id)}
                        className="p-2 text-zinc-500 hover:text-rose-400 rounded-lg text-sm transition cursor-pointer"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => addToPlan(item as Parameters<typeof addToPlan>[0])}
                        className="px-4 py-2 bg-[#ccff00] hover:bg-[#b3e600] text-black rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                      >
                        + Add to Plan
                      </button>
                      <button
                        onClick={() => removeFromSaved(item.id)}
                        className="p-2 text-zinc-500 hover:text-rose-400 rounded-lg text-sm transition cursor-pointer"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
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
