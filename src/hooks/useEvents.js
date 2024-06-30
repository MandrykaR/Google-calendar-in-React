import { useState, useEffect } from 'react';
import { fetchEvents, createEvent, deleteEvent } from '../utils/api';
import { prepareEventData, validateEvent } from '../utils/eventUtils';

const useEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const addEvent = async (eventData) => {
    const errorMessage = validateEvent(eventData, events);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const preparedEventData = prepareEventData(eventData);
      const newEvent = await createEvent(preparedEventData);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeEvent = async (id) => {
    try {
      const now = new Date();
      const eventToDelete = events.find((event) => event.id === id);
      const eventStartTime = new Date(eventToDelete.dateFrom);
      const timeDiff = (eventStartTime - now) / (1000 * 60);

      if (timeDiff <= 15) {
        alert(
          'You cannot delete an event less than 15 minutes before it starts.'
        );
        return;
      }

      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    addEvent,
    removeEvent,
  };
};

export default useEvents;
