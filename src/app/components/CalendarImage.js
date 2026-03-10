'use client';

import { useEffect, useState } from 'react';
import { getImagePath } from '../lib/imagePath';

export default function CalendarImage() {
  const [day, setDay] = useState(1);

  useEffect(() => {
    const today = new Date();
    setDay(today.getDate());
  }, []);

  return (
    <img
      src={getImagePath(`${day}.calendar.png`)}
      alt={`Calendar - ${day}`}
      width={36}
      height={36}
      className="dark:invert"
    />
  );
}
