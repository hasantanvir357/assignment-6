import { useState } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export type WorkoutItem = {
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

export function useMyPlan() {
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
    if (sortBy === 'duration') return extractNumber(a.duration || a.time) - extractNumber(b.duration || b.time);
    if (sortBy === 'calories') {
      return (
        extractNumber(b.calories || b.calorie || b.caloriesBurned) -
        extractNumber(a.calories || a.calorie || a.caloriesBurned)
      );
    }
    if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
    return 0;
  });

  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((acc, item: WorkoutItem) => acc + extractNumber(item.duration || item.time), 0);
  const totalCalories = todaysPlan.reduce(
    (acc, item: WorkoutItem) => acc + extractNumber(item.calories || item.calorie || item.caloriesBurned),
    0
  );

  const handleMarkAsDone = (id: string, title: string) => {
    removeFromPlan(id);
    toast.success(`Completed "${title}"! Great job! 🎉`);
  };

  return {
    todaysPlan,
    savedWorkouts,
    activeTab,
    sortBy,
    sortedList,
    totalExercises,
    totalMinutes,
    totalCalories,
    setSelectedTab,
    setSortBy,
    handleMarkAsDone,
    removeFromPlan,
    removeFromSaved,
    addToPlan,
  };
}