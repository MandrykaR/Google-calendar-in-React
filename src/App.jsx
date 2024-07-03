import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils.js';
import useModal from './hooks/useModal';
import useEvents from './hooks/useEvents';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const { isModalOpen, eventData, openModal, closeModal } = useModal();
  const { events, addEvent, removeEvent } = useEvents();

  const handleEventCreate = async (eventData) => {
    await addEvent(eventData);
    closeModal();
  };

  return (
    <>
      <Header
        onOpenModal={openModal}
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        weekDates={generateWeekRange(getWeekStartDate(weekStartDate))}
        events={events}
        onDeleteEvent={removeEvent}
        onOpenModal={openModal}
      />
      {isModalOpen && (
        <Modal
          onEventCreate={handleEventCreate}
          onClose={closeModal}
          initialEventData={eventData}
        />
      )}
    </>
  );
};

export default App;
