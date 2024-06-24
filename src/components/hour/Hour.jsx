import React from 'react';
import Event from '../event/Event.jsx';
import { formatMins } from '../../../src/utils/dateUtils.js';
import PropTypes from 'prop-types';

import './hour.scss';

const Hour = ({
  dataHour,
  hourEvents,
  onDeleteEvent,
  onOpenModal,
  dataDay,
}) => {
  const handleClick = () => {
    const date = new Date(dataDay);
    date.setHours(dataHour, 0, 0, 0);

    const dateFrom = new Date(date);
    const dateTo = new Date(date);

    dateTo.setHours(dataHour + 1);

    onOpenModal({
      title: '',
      description: '',
      date: dateFrom.toISOString().slice(0, 10),
      dateFrom: dateFrom.toTimeString().slice(0, 5),
      dateTo: dateTo.toTimeString().slice(0, 5),
    });
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={handleClick}
    >
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  dataDay: PropTypes.instanceOf(Date).isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Hour;
