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

export const fetchEventAttendees = async (event_id) => {
  const res = await dogEventsApi.get(`/events/${event_id}/attendees`);
  return res.data.attendees;
};

export const fetchUsers = async () => {
  const res = await dogEventsApi.get(`/users`);
  return res.data.users;
};

export const fetchUserById = async (user_id) => {
  const res = await dogEventsApi.get(`/users/${user_id}`);
  return res.data.user;
};

export const fetchEventsAttending = async (user_id) => {
  const res = await dogEventsApi.get(`/users/${user_id}/attending`);
  return res.data.eventsAttending;
};

export const loginUser = async (email, password) => {
  const res = await dogEventsApi.post(`/users/login`, {
    email: email,
    password: password,
  });
  return res.data.user;
};
