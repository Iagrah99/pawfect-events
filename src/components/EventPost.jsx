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
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserMinus,
  faUserAlt,
  faClock,
  faTags,
  faPoundSign,
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
    <>
      <article className="max-w-5xl mx-auto md:my-10 p-6 bg-slate-900 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white">
              {event.title}
            </Breadcrumb.Item>
          </Breadcrumb>

          {organiser && loggedInUser
            ? organiser.username === loggedInUser.username && (
                <div className="space-x-3 flex items-center self-center md:self-auto">
                  <EditEvent
                    event={event}
                    setIsUpdated={setIsUpdated}
                    error={error}
                    setError={setError}
                    setIsError={setIsError}
                  />

                  <button
                    onClick={handleDeleteEvent}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md"
                  >
                    Delete
                  </button>
                </div>
              )
            : null}
        </div>

        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-3/6">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="w-full md:w-3/6 md:pl-6 mt-4 md:mt-0">
            <p className="text-2xl font-bold mb-3 text-white">
              {event.title} - {event.location}
            </p>
            <p className="text-white mb-3">
              {" "}
              <FontAwesomeIcon
                icon={faUserAlt}
                className="mr-1 align-middle"
              />{" "}
              Organised by:{" "}
              <span
                className="cursor-pointer font-bold hover:text-cyan-200"
                onClick={handleLink}
              >
                {event.organiser}
              </span>
            </p>
            <p className="text-white">
              <FontAwesomeIcon icon={faClock} className="mr-2 align-middle" />
              {isValidDate(startDate) && isValidDate(endDate)
                ? format(startDate, "EEEE, do MMMM yyyy 'from' h:mmaaa") +
                  " - " +
                  (isSameDay(startDate, endDate)
                    ? format(endDate, "h:mmaaa")
                    : format(endDate, "EEEE, do MMMM yyyy h:mmaaa"))
                : "Invalid date"}
            </p>

            <div className="flex flex-col mb-2">
              <p className="text-sm text-white">
                {" "}
                <FontAwesomeIcon
                  icon={faTags}
                  className="mr-1 align-middle"
                />{" "}
                Type: {event.event_type}
              </p>
              <p className="text-lg font-bold text-white">
                <FontAwesomeIcon
                  icon={faPoundSign}
                  className="mr-2 align-middle"
                />{" "}
                Cost:{" "}
                {event.price_in_pence === 0
                  ? "FREE"
                  : `£${formatCost(event.price_in_pence)}`}
              </p>
            </div>

            <div className="flex items-center mt-2">
              {loggedInUser &&
                organiser &&
                loggedInUser.username !== organiser.username &&
                (() => {
                  const isDisabled = isSigningUp || isOptingOut;
                  const isUserLeaving = isAttendee && isOptingOut;
                  const buttonTitle = isAttendee
                    ? "Opt Out Of Event"
                    : "Sign Up For Event";
                  const buttonText = isUserLeaving
                    ? "Opting Out"
                    : isAttendee
                    ? "Opt Out Of Event"
                    : "Sign Up For Event";

                  const buttonClasses = `
                    mt-2 mr-2 px-6 py-2 text-white font-semibold rounded-md transition-colors duration-200
                    ${
                      isDisabled
                        ? "bg-gray-600 cursor-not-allowed opacity-50"
                        : "bg-gray-800 hover:bg-gray-700 cursor-pointer"
                    }
                  `;

                  return (
                    <button
                      onClick={handleAttendEvent}
                      className={buttonClasses}
                      title={buttonTitle}
                      disabled={isDisabled}
                    >
                      {isAttendee ? (
                        <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
                      ) : (
                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                      )}
                      {buttonText}
                    </button>
                  );
                })()}

              <a className="no-underline" href={calendarLink} target="_blank">
                <button
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-800 px-3 py-2 mt-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  title="Add to Google Calendar"
                  onClick={handleAddToCalendar}
                >
                  <span className="text-white text-sm font-semibold">
                    Add to Google Calendar
                  </span>
                  <img
                    src="https://i.ibb.co/qDSRS1J/google-calendar-512x512.png"
                    alt="Add to Google Calendar"
                    className="w-6 h-6"
                  />
                </button>
              </a>
            </div>

            {isError && (
              <p className="mt-3 text-red-500 font-semibold">
                {error.data.msg}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-white mb-4">{event.description}</p>
        </div>
      </article>
    </>
  );
};

export default EventPost;
