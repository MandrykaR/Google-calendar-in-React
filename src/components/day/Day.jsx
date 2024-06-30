import React from 'react';
import Hour from '../hour/Hour';
import CurrentTimeIndicator from '../CurrentTimeIndicator/CurrentTimeIndicator.jsx';
import { isToday } from '../../utils/dateUtils';
import PropTypes from 'prop-types';

const Day = ({ dataDay, dayEvents, onDeleteEvent, onOpenModal, dayStart }) => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  const todayCheck = isToday(dayStart);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {todayCheck && <CurrentTimeIndicator isToday={todayCheck} />}
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );
        return (
          <Hour
            key={dataDay + hour}
            dataDay={dayStart}
            dataHour={hour}
            hourEvents={hourEvents}
            onDeleteEvent={onDeleteEvent}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
  dayEvents: PropTypes.arrayOf(
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

export default Day;
