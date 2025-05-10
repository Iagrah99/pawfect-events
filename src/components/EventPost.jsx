import { format, isSameDay } from "date-fns";
import formatCost from "../../utils/formatCost";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  postEventAttending,
  removeEventAttending,
  deleteEvent,
  generateGoogleCalendarEvent,
} from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserMinus,
  faTags,
  faCrown,
  faCalendarAlt,
  faCreditCard,
  faTrashAlt,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { EditEvent } from "./EditEvent";

const EventPost = ({
  event,
  attendees,
  setAttendees,
  users,
  setIsError,
  isError,
  setError,
  error,
  setIsUpdated,
}) => {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const navigate = useNavigate();

  const { loggedInUser } = useContext(UserContext);

  const organiser = users.find((user) => user.username === event.organiser);

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isOptingOut, setIsOptingOut] = useState(false);
  const [isDeletingEvent, setIsDeletingEvent] = useState(false);

  const [calendarLink, setCalendarLink] = useState("");

  const handleLink = (e) => {
    e.preventDefault();
    navigate(`/users/${organiser.user_id}`);
  };

  const handleDeleteEvent = async () => {
    try {
      setIsDeletingEvent(true);
      const deletedEvent = await deleteEvent(event.event_id);
      setIsDeletingEvent(false);
      navigate(`/users/${organiser.user_id}`, { state: { deletedEvent } });
    } catch (err) {
      setIsDeletingEvent(false);
      setIsError(true);
      setError(err.response);
    }
  };

  const handleAddToCalendar = async () => {
    const formattedTitle = event.title.replaceAll(" ", "+");
    const eventDetails = {
      title: formattedTitle,
      start_date: event.start_date,
      end_date: event.end_date,
      location: event.location,
      url: `${window.location.protocol}//${window.location.host}/events/${event.event_id}`,
    };
    const calendarEvent = await generateGoogleCalendarEvent(eventDetails);
    setCalendarLink(calendarEvent);
  };

  const isAttendee = loggedInUser
    ? attendees.some((attendee) => attendee === loggedInUser.username)
    : false;

  const handleAttendEvent = async (e) => {
    e.preventDefault();

    if (!isAttendee) {
      try {
        setIsError(false);
        setIsSigningUp(true);
        await postEventAttending(
          loggedInUser.user_id,
          loggedInUser.username,
          event.title
        );
        setAttendees((prevAttendees) => [
          ...prevAttendees,
          loggedInUser.username,
        ]);
        setIsSigningUp(false);
      } catch (err) {
        setIsSigningUp(false);
        setIsError(true);
        setError(err.response);
      }
    } else {
      try {
        setIsError(false);
        setIsOptingOut(true);
        await removeEventAttending(loggedInUser.user_id, event.title);
        setAttendees((prevAttendees) =>
          prevAttendees.filter((attendee) => attendee !== loggedInUser.username)
        );
        setIsOptingOut(false);
      } catch (err) {
        setIsOptingOut(false);
        setIsError(true);
        setError(err.response);
      }
    }
  };

  const isValidDate = (date) => !isNaN(date.getTime());

  return (
    <article className="max-w-4xl mx-auto mt-10 bg-slate-900 border-1 border-slate-800 rounded-lg shadow-md overflow-hidden text-white">
      {/* Image */}
      <div className="relative w-full h-[350px]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col gap-2">
        {/* Title and location */}
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          {event.title}
        </h2>

        <div className="flex gap-3 items-center">
          <p className="flex items-center gap-2 text-base font-semibold cursor-pointer lg:hover:text-orange-500" onClick={handleLink}>
            <FontAwesomeIcon icon={faCrown} className="text-orange-500" />{" "}
            {event.organiser}
          </p>

          <p className="flex items-center gap-2 text-base">
            <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />{" "}
            {event.location}
          </p>

          <p className="flex items-center gap-2 text-base font-bold">
            <FontAwesomeIcon icon={faCreditCard} className="text-orange-500" />{" "}
            {event.price_in_pence === 0
              ? "FREE"
              : `£${formatCost(event.price_in_pence)}`}
          </p>
        </div>

        {/* Dates */}
        <div className="flex flex-col md:flex-row gap-2 text-base">
          <p className="text-white">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="mr-2 text-orange-500"
            />
            {isValidDate(startDate) && isValidDate(endDate)
              ? format(startDate, "EEEE, do MMMM yyyy 'from' h:mmaaa") +
                " - " +
                (isSameDay(startDate, endDate)
                  ? format(endDate, "h:mmaaa")
                  : format(endDate, "EEEE, do MMMM yyyy h:mmaaa"))
              : "Invalid date"}
          </p>
        </div>

        {/* Category & Cost */}
        <div className="flex flex-col sm:flex-row gap-3 text-base">
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faTags} className="text-orange-500" />
            {event.category?.replace(/-/g, " ")}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-white whitespace-pre-line">{event.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-start md:items-center gap-3">
          {loggedInUser &&
            organiser &&
            loggedInUser.username !== organiser.username && (
              <button
                onClick={handleAttendEvent}
                disabled={isSigningUp || isOptingOut}
                title={isAttendee ? "Opt Out Of Event" : "Sign Up For Event"}
                className={`px-3 h-10 flex items-center space-x-2 text-white font-semibold rounded-md transition duration-200 ${
                  isSigningUp || isOptingOut
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-gray-800 lg:hover:bg-gray-700 cursor-pointer"
                }`}
              >
                <FontAwesomeIcon
                  icon={isAttendee ? faUserMinus : faUserPlus}
                  className="mr-2 w-5 h-5 text-orange-500"
                />
                {isSigningUp
                  ? "Attending..."
                  : isOptingOut
                  ? "Opting Out..."
                  : isAttendee
                  ? "Opt Out"
                  : "Attend Event"}
              </button>
            )}

          <a href={calendarLink} target="_blank" className="no-underline">
            <button
              onClick={handleAddToCalendar}
              className="flex items-center space-x-2 bg-gray-800 lg:hover:bg-gray-700 px-3 h-10 rounded-md"
            >
              <img
                src="https://i.ibb.co/qDSRS1J/google-calendar-512x512.png"
                alt="Google Calendar"
                className="w-7 h-7"
              />
              <span className="text-white text-sm font-semibold">
                Add to Google Calendar
              </span>
            </button>
          </a>

          {loggedInUser?.username === organiser?.username && (
            <div className="flex gap-3">
              <EditEvent
                event={event}
                setIsUpdated={setIsUpdated}
                error={error}
                setError={setError}
                setIsError={setIsError}
              />
              <button
                onClick={handleDeleteEvent}
                className="text-white bg-slate-800 lg:hover:bg-slate-700 px-4 py-2 rounded-md shadow-md"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="mr-2 text-orange-500"
                />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Organiser-only Controls */}

        {isError && (
          <p className="mt-3 text-red-500 font-semibold">{error.data.msg}</p>
        )}
      </div>
    </article>
  );
};

export default EventPost;
