import { Workout } from '@/types';

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    if (!res.ok) throw new Error('Failed to fetch workouts');
    return res.json();
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}

export async function getSingleWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching single workout:', error);
    return null;
  }
}