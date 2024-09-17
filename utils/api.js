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
