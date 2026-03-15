'use client';

import { getImagePath } from '../lib/imagePath';

export default function CalendarImage({ dateString }) {
  const date = dateString ? new Date(dateString) : new Date();

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div className="flex flex-col items-center">
      <img
        src={getImagePath(`${day}.calendar.png`)}
        alt={`Calendar - ${day}`}
        width={36}
        height={36}
        className="dark:invert"
      />
    </div>
  );
}
