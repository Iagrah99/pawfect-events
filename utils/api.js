import axios from "axios";

const dogEventsApi = axios.create({
  baseURL: "https://pawfect-events-api.fly.dev/api",
});

export const fetchEvents = async (sort_by, order_by, category) => {
  const res = await dogEventsApi.get(`/events`, {
    params: { sort_by, order_by, category },
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

export const updateUser = async (user_id, { username, password }) => {
  const res = await dogEventsApi.patch(`/users/${user_id}`, {
    username,
    password,
  });
  return res.data.user;
};

export const deleteUser = async (user_id) => {
  const res = await dogEventsApi.delete(`/users/${user_id}`);
  return res.data;
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
    method: "delete",
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
  category,
  price_in_pence,
  location,
  image = "",
}) => {
  const res = await dogEventsApi.post("/events", {
    title,
    organiser,
    description,
    start_date,
    end_date,
    category,
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
  avatarFile,
}) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("isOrganiser", isOrganiser);
  if (avatarFile) {
    formData.append("avatar", avatarFile); // matches backend field name
  }

  console.log(avatarFile)

  const res = await dogEventsApi.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
    category,
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
    category,
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

export const getCategories = async () => {
  const res = await dogEventsApi.get("/categories");
  return res.data.categories;
};

export const generateGoogleCalendarEvent = async ({
  title,
  start_date,
  end_date,
  location,
  url,
}) => {
  const baseURL = "https://calendar.google.com/calendar/render";

  // Convert dates to Google Calendar format (YYYYMMDDTHHMMSSZ)
  const formattedStartDate = start_date
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  const formattedEndDate = end_date
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  const eventDetails = `Event+details+here%3A+${encodeURIComponent(url)}`;

  return `${baseURL}?action=TEMPLATE&text=${title}&dates=${formattedStartDate}/${formattedEndDate}&ctz=Europe/London&location=${location}&details=${eventDetails}`;
};
