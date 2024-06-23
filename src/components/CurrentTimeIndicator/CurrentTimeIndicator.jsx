import React, { useEffect, useState } from 'react';

import './CurrentTimeIndicator.scss';

const CurrentTimeIndicator = () => {
  const [topOffset, setTopOffset] = useState(0);

  const updateTopOffset = () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    setTopOffset((minutesSinceMidnight / (24 * 60)) * 100);
  };

  useEffect(() => {
    updateTopOffset();
    const intervalId = setInterval(updateTopOffset, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="current-time-indicator" style={{ top: `${topOffset}%` }} />
  );
};

export default CurrentTimeIndicator;
