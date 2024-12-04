import { useEffect, useState } from 'react';

// Custom React Hook
export default function useFormattedTime(date = new Date()) {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const strTime = formattedHours + ':' + formattedMinutes + ' ' + ampm;
    setFormattedTime(strTime);
  }, [date]); // Re-run the effect if the date changes

  return formattedTime;
}
