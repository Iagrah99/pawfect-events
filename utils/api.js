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

export const postEventAttending = async (user_id, username, eventAttending) => {
  const res = await dogEventsApi.post(`/users/${user_id}/attending`, {
    username: username,
    eventAttending: eventAttending,
  });
  return res.data.eventsAttending;
};

export const removeEventAttending = async (user_id, event_title) => {
  const res = await dogEventsApi({
    method: 'delete',
    url: `/users/${user_id}/attending`,
    data: { event_title: event_title },
  });
  return res.data;
};

export const postEvent = async ({
  title,
  organiser,
  description,
  start_date,
  end_date,
  event_type,
  price_in_pence,
  location,
  image,
}) => {
  const res = await dogEventsApi.post('/events', {
    title,
    organiser,
    description,
    start_date,
    end_date,
    event_type,
    price_in_pence,
    location,
    image,
  });
  return res.data.event;
};

export const loginUser = async (email, password) => {
  const res = await dogEventsApi.post(`/users/login`, {
    email: email,
    password: password,
  });
  return res.data.user;
};

export const RegisterUser = async ({
  email,
  username,
  password,
  isOrganiser,
  avatarUrl,
}) => {
  const res = await dogEventsApi.post('/users', {
    email,
    username,
    password,
    isOrganiser,
    avatarUrl,
  });
  return res.data.newUser;
};
