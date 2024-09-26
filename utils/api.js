import axios from 'axios';

const dogEventsApi = axios.create({
  baseURL: 'https://dog-events-be.onrender.com/api',
});

const dogImageApi = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  timeout: 10000,
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

export const registerUser = async ({
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

export const UpdateEvent = async (
  event_id,
  {
    title,
    description,
    start_date,
    end_date,
    event_type,
    price_in_pence,
    location,
    image,
  }
) => {
  const res = await dogEventsApi.patch(`/events/${event_id}`, {
    title,
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

export const deleteEvent = async (event_id) => {
  const res = await dogEventsApi.delete(`/events/${event_id}`);
  return res.status;
};

export const generateImage = async () => {
  const apiKey = import.meta.env.VITE_DOGIMG_API_KEY;
  const res = await dogImageApi.get('/images/search?size=full', {
    headers: {
      'x-api-key': apiKey,
    },
  });
  return res.data[0].url;
};

export const generateGoogleCalendarEvent = async ({
  title,
  start_date,
  end_date,
  location,
  url,
}) => {
  const baseURL = 'https://calendar.google.com/calendar/render';

  // Convert dates to Google Calendar format (YYYYMMDDTHHMMSSZ)
  const formattedStartDate = start_date
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
  const formattedEndDate = end_date
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');

  return `${baseURL}?action=TEMPLATE&text=${title}&dates=${formattedStartDate}/${formattedEndDate}&location=${location}&details=Event+details+here:+${url}`;
};
