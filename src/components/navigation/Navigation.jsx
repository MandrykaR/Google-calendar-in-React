import React from 'react';
import PropTypes from 'prop-types';
import './navigation.scss';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  const isCurrentDay = (date) => {
    const currentDate = new Date();
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div className="calendar__day-label day-label ">
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span
            className={`day-label__day-number ${
              isCurrentDay(dayDate) ? 'current-day' : ''
            }`}
          >
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default Navigation;
