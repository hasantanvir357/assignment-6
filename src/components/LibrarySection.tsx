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

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    if (sortBy === 'calories') return parseInt(a.calories) - parseInt(b.calories);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold uppercase text-white tracking-tight">THE LIBRARY</h2>
          <p className="text-xs text-zinc-400">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
            className="select select-bordered select-xs bg-base-100 text-white border-zinc-700 focus:border-[#ccff00]"
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
