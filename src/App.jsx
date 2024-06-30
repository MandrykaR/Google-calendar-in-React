import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import {
  getWeekNavigationText,
  getNextWeek,
  getPrevWeek,
} from './utils/weekUtils.js';
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils.js';
import useModal from './hooks/useModal';
import useEvents from './hooks/useEvents';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const { isModalOpen, eventData, openModal, closeModal } = useModal();
  const { events, addEvent, removeEvent } = useEvents();

  const handlePrevWeek = () => {
    setWeekStartDate(getPrevWeek);
  };

  const handleNextWeek = () => {
    setWeekStartDate(getNextWeek);
  };

  const handleCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const handleEventCreate = async (eventData) => {
    await addEvent(eventData);
    closeModal();
  };

  const navTextMonth = getWeekNavigationText(weekStartDate);

  return (
    <>
      <Header
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onCurrentWeek={handleCurrentWeek}
        navTextMonth={navTextMonth}
        onOpenModal={openModal}
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
