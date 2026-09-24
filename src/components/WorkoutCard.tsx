import Link from 'next/link';

export default function WorkoutCard({ workout }: { workout: any }) {
  const title = workout.title || workout.name || workout.workoutName || 'UNTITLED WORKOUT';

  let rawCategory =
    workout.category ||
    workout.categories ||
    workout.muscleGroup ||
    workout.muscle_group ||
    workout.target ||
    workout.tags ||
    [];

  let categories: string[] = [];

  if (Array.isArray(rawCategory)) {
    categories = rawCategory;
  } else if (typeof rawCategory === 'string') {
    categories = rawCategory.split(',').map((item) => item.trim());
  }

  if (categories.length === 0 || (categories.length === 1 && categories[0].toUpperCase() === 'FULL BODY')) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('bench press') || titleLower.includes('bench')) {
      categories = ['CHEST', 'ARMS'];
    } else if (titleLower.includes('pull-up') || titleLower.includes('deadlift')) {
      categories = ['BACK', 'ARMS'];
    } else if (titleLower.includes('squat') || titleLower.includes('lunge')) {
      categories = ['LEGS', 'CORE'];
    } else if (titleLower.includes('overhead press') || titleLower.includes('shoulder')) {
      categories = ['SHOULDERS', 'ARMS'];
    } else if (titleLower.includes('bicep curl') || titleLower.includes('curl')) {
      categories = ['ARMS'];
    } else if (titleLower.includes('plank') || titleLower.includes('twist')) {
      categories = ['CORE'];
    } else if (titleLower.includes('push-up')) {
      categories = ['CHEST', 'ARMS', 'CORE'];
    } else {
      categories = ['FULL BODY'];
    }
  }

  const equipment = workout.equipment || workout.equipmentNeeded || 'Bodyweight';

  const rawDuration = workout.duration || workout.time || workout.minutes;
  const duration = rawDuration
    ? rawDuration.toString().includes('min')
      ? rawDuration
      : `${rawDuration} min`
    : '15 min';

  const rawCalories = workout.calories || workout.calorie || workout.caloriesBurned;
  const calories = rawCalories
    ? rawCalories.toString().includes('kcal')
      ? rawCalories
      : `${rawCalories} kcal`
    : '100 kcal';

  const rating = workout.rating || workout.stars || '4.5';

  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#14151a] border border-zinc-800/90 hover:border-zinc-700 transition duration-200 rounded-2xl p-4 flex flex-col justify-between h-full group">
        <div>
          <div className="h-44 bg-zinc-900 rounded-xl mb-3.5 overflow-hidden relative">
            <img
              src={workout.image || '/placeholder.png'}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>

          <div className="flex gap-1.5 mb-2.5 flex-wrap">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#ccff00] transition leading-snug mb-1">
            {title}
          </h3>

          <p className="text-xs text-zinc-500 mb-4 font-medium">{equipment}</p>
        </div>

        <div className="flex justify-between items-center text-xs text-zinc-400 border-t border-zinc-800/80 pt-3 font-semibold">
          <span className="flex items-center gap-1">⏱ {duration}</span>
          <span className="flex items-center gap-1">🔥 {calories}</span>
          <span className="flex items-center gap-1">⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}