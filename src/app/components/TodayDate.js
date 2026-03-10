'use client';

import { useEffect, useState } from 'react';

export default function TodayDate() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    setDate(formattedDate);
  }, []);

  return <>{date}</>;
}
