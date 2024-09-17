import axios from 'axios';

const dogEventsApi = axios.create({
  baseURL: 'https://dog-events-be.onrender.com/api',
});

export const fetchEvents = async (sort_by, order_by) => {
  const res = await dogEventsApi.get(`/events`, {
    params: { sort_by: sort_by, order_by: order_by },
  });
  return res.data.events;
};

export const fetchEventById = async (event_id) => {
  const res = await dogEventsApi.get(`/events/${event_id}`);
  return res.data.event;
};
