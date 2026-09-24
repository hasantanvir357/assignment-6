'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout } from '@/types';
import toast from 'react-hot-toast';

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_plan');
    const savedSaved = localStorage.getItem('fitlog_saved');
    if (savedPlan) setTodaysPlan(JSON.parse(savedPlan));
    if (savedSaved) setSavedWorkouts(JSON.parse(savedSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(todaysPlan));
    localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
  }, [todaysPlan, savedWorkouts]);

  const addToPlan = (workout: Workout) => {
    if (todaysPlan.length >= 5) {
      toast.error('Cap of 5 lifts reached for today!');
      return;
    }
    if (todaysPlan.some((w) => w.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    setTodaysPlan([...todaysPlan, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (savedWorkouts.some((w) => w.id === workout.id)) {
      toast.error('Already saved for later!');
      return;
    }
    setSavedWorkouts([...savedWorkouts, workout]);
    toast.success('Saved for later!');
  };

  const removeFromPlan = (id: string) => {
    setTodaysPlan(todaysPlan.filter((w) => w.id !== id));
    toast.success("Removed from today's plan!");
  };

  const removeFromSaved = (id: string) => {
    setSavedWorkouts(savedWorkouts.filter((w) => w.id !== id));
    toast.success('Removed from saved!');
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
