import { format } from 'date-fns';
import formatCost from '../../utils/formatCost';
import { useContext, useState, useRef } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { postEventAttending, removeEventAttending } from "../../utils/api";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from "react-bootstrap"

const EventPost = ({ event, attendees, setAttendees, users, setIsError, isError, setError, error }) => {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const navigate = useNavigate();

  const { loggedInUser } = useContext(UserContext);

  const organiser = users.find((user) => user.username === event.organiser)

  const [successMessage, setSuccessMessage] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isOptingOut, setIsOptingOut] = useState(false);

  const timeoutRef = useRef(null);

  const clearMessageAfterTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleLink = (e) => {
    e.preventDefault()
    navigate(`/users/${organiser.user_id}`)
  }

  const isAttendee = loggedInUser ? attendees.some((attendee) => attendee === loggedInUser.username) : false;

  const handleAttendEvent = async (e) => {
    e.preventDefault();

    if (!isAttendee) {
      try {
        setSuccessMessage("")
        setIsError(false)
        setIsSigningUp(true)
        await postEventAttending(loggedInUser.user_id, loggedInUser.username, event.title);
        setAttendees((prevAttendees) => [...prevAttendees, loggedInUser.username]);
        setIsSigningUp(false)
        setSuccessMessage('Successfully signed up for the event!');
        clearMessageAfterTimeout();
      } catch (err) {
        setIsSigningUp(false);
        setIsError(true)
        setError(err.response)
      }
    } else {
      try {
        setSuccessMessage("")
        setIsError(false)
        setIsOptingOut(true)
        await removeEventAttending(loggedInUser.user_id, event.title);
        setAttendees((prevAttendees) => prevAttendees.filter((attendee) => attendee !== loggedInUser.username));
        setIsOptingOut(false)
        setSuccessMessage('Successfully opted out of the event.');
        clearMessageAfterTimeout();
      } catch (err) {
        setIsOptingOut(false);
        setIsError(true)
        setError(err.response)
      }
    }
  };

  const isValidDate = (date) => !isNaN(date.getTime());

  return (
    <article className="max-w-5xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg">

      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className='text-white'>{event.title}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="w-full md:w-3/6 md:pl-6 mt-4 md:mt-0">
          <p className="text-2xl font-bold mb-2 text-white">{event.title} - {event.location}</p>
          <p className="text-white mb-4">Organised by: <span className='cursor-pointer font-bold hover:text-cyan-200' onClick={handleLink}>{event.organiser}</span></p>
          <p>
            {isValidDate(startDate) && isValidDate(endDate)
              ? format(startDate, "EEEE, do MMMM yyyy 'from' h:mmaaa") + " - " + format(endDate, "h:mmaaa")
              : 'Invalid date'}
          </p>

          <div className="flex flex-col mb-2">
            <p className="text-sm text-white">Type: {event.event_type}</p>
            <p className="text-lg font-bold">
              Cost: {event.price_in_pence === 0 ? "FREE" : `£${formatCost(event.price_in_pence)}`}
            </p>
          </div>

          <div className="flex items-center mt-2">
            {loggedInUser && organiser && loggedInUser.username !== organiser.username && (
              <button
                onClick={handleAttendEvent}
                className={`mt-2 mr-2 px-6 py-2 text-white font-semibold rounded-md transition-colors duration-200 
                ${isSigningUp || isOptingOut
                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gray-800 hover:bg-gray-700 cursor-pointer'}`}
                title={isAttendee ? "Opt Out Of Event" : "Sign Up For Event"}
                disabled={isSigningUp || isOptingOut}
              >
                {!isAttendee && (
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                )}
                {isAttendee && (
                  <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
                )}
                {isAttendee ? "Opt Out Of Event" : "Sign Up For Event"}
              </button>
            )}

            <button
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-800 px-3 py-2 mt-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              title="Add to Google Calendar"
            >
              <span className="text-white text-sm font-semibold">Add to Google Calendar</span>
              <img
                src="https://i.ibb.co/qDSRS1J/google-calendar-512x512.png"
                alt="Add to Google Calendar"
                className="w-6 h-6"
              />
            </button>
          </div>

          <div className="mt-3">
            {isSigningUp && (
              <div className="flex items-center space-x-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className='mb-2'
                />
                <p className="text-blue-500 font-semibold">Signing up for the event...</p>
              </div>
            )}
            {isOptingOut && (
              <div className="flex items-center space-x-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className='mb-2'
                />
                <p className="text-blue-500 font-semibold">Opting out of the event...</p>
              </div>
            )}
          </div>

          {successMessage && (
            <p className="mt-3 text-green-500 font-semibold">{successMessage}</p>
          )}
          {isError && (
            <p className="mt-3 text-red-500 font-semibold">{error.data.msg}</p>
          )}
        </div>
      </div>

      <div className="my-4">
        <p className="text-white mb-4">{event.description}</p>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Attendees</h2>
        <ul className="list-disc pl-5 text-white">
          {attendees.map((attendee) => (
            <li key={attendee}>{attendee}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default EventPost;
