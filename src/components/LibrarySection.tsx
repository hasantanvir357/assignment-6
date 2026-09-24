'use client';

import { useState, useEffect } from 'react';
import WorkoutCard from '@/components/WorkoutCard';
import { getWorkouts } from '@/lib/workouts';
import { Workout } from '@/types';

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  useEffect(() => {
    getWorkouts().then((data) => {
      setWorkouts(data);
      setLoading(false);
    });
  }, []);

  const extractNumber = (val: unknown): number => {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    const parsed = parseInt(val.toString().replace(/\D/g, ''), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const sortedWorkouts = [...workouts].sort((a, b) => {
    const workoutA = a as Workout & Record<string, unknown>;
    const workoutB = b as Workout & Record<string, unknown>;

    if (sortBy === 'duration') {
      return extractNumber(workoutA.duration || workoutA.time) - extractNumber(workoutB.duration || workoutB.time);
    }
    if (sortBy === 'calories') {
      return (
        extractNumber(workoutB.calories || workoutB.calorie || workoutB.caloriesBurned) -
        extractNumber(workoutA.calories || workoutA.calorie || workoutA.caloriesBurned)
      );
    }
    if (sortBy === 'rating') {
      return Number(workoutB.rating || 0) - Number(workoutA.rating || 0);
    }
    return 0;
  });

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-extrabold uppercase text-white tracking-wider">
            THE LIBRARY
          </h2>
          <p className="text-xs text-zinc-400">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
            className="select select-bordered select-xs bg-[#14151a] text-white border-zinc-700 focus:border-[#ccff00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 font-medium">Loading workouts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
