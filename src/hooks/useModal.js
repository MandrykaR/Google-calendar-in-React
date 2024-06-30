import { useState } from 'react';

const useModal = (
  initialEventData = {
    date: '',
    title: '',
    description: '',
    dateFrom: '',
    dateTo: '',
  }
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState(initialEventData);

  const openModal = (data = initialEventData) => {
    setEventData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    eventData,
    openModal,
    closeModal,
  };
};

export default useModal;
