import React from 'react';
import Day from '../day/Day.jsx';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({ weekDates, events, onDeleteEvent, onOpenModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const dayEvents = events.filter((event) => {
          return event.dateFrom >= dayStart && event.dateFrom <= dayEnd;
        });

        return (
          <Day
            key={dayStart.toISOString()}
            dataDay={dayStart.getDate()}
            dayStart={dayStart}
            dayEvents={dayEvents}
            onDeleteEvent={onDeleteEvent}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Week;
