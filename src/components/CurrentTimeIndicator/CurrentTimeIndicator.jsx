import React, { useEffect, useState } from 'react';
import './CurrentTimeIndicator.scss';

const CurrentTimeIndicator = ({ isToday }) => {
  const [topOffset, setTopOffset] = useState(0);

  const updateTopOffset = () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    setTopOffset((minutesSinceMidnight / (24 * 60)) * 100);
  };

  useEffect(() => {
    if (isToday) {
      updateTopOffset();
      const intervalId = setInterval(updateTopOffset, 60000);
      return () => clearInterval(intervalId);
    }
  }, [isToday]);

  if (!isToday) {
    return null;
  }

  return (
    <div className="current-time-indicator" style={{ top: `${topOffset}%` }} />
  );
};

export default CurrentTimeIndicator;
