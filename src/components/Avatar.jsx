const bgColors = [
  'bg-red-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500',
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-orange-500',
  'bg-teal-500', 'bg-rose-500'
];

export default function Avatar({ name, className = "size-8 text-lg" }) {
  const firstLetter = name?.charAt(0).toUpperCase() || '?';

  // Get a consistent color based on char code
  const colorIndex = name ? name.charCodeAt(0) % bgColors.length : 0;
  const bgColor = bgColors[colorIndex];

  return (
    <div
      className={`${className} ${bgColor} text-white font-bold flex items-center justify-center rounded-full `}>
      {firstLetter}
    </div>
  );
}
