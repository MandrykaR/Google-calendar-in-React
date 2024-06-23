import axios from 'axios';

const baseUrl = 'https://658d94da7c48dce9473970f5.mockapi.io/tasks';

export const fetchEvents = async () => {
  const res = await axios.get(baseUrl);
  if (res.status === 200) {
    return res.data.map((elem) => ({
      ...elem,
      dateFrom: new Date(elem.dateFrom),
      dateTo: new Date(elem.dateTo),
    }));
  } else {
    throw new Error(res.status);
  }
};

export const createEvent = async (eventToCreate) => {
  const res = await axios.post(baseUrl, eventToCreate);
  if (res.status === 201) {
    return {
      ...res.data,
      dateFrom: new Date(res.data.dateFrom),
      dateTo: new Date(res.data.dateTo),
    };
  } else {
    throw new Error(res.status);
  }
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  if (res.status === 200) {
    return true;
  } else {
    throw new Error(res.status);
  }
};
