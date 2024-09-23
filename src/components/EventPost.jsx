import { format } from 'date-fns';
import formatCost from '../../utils/formatCost';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { postEventAttending, removeEventAttending } from "../../utils/api";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const EventPost = ({ event, attendees, setAttendees, users, setIsError, setError }) => {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const navigate = useNavigate();

  const { loggedInUser } = useContext(UserContext);

  const organiser = users.find((user) => user.username === event.organiser)

  const [successMessage, setSuccessMessage] = useState('');

  const handleLink = (e) => {
    e.preventDefault()
    navigate(`/users/${organiser.user_id}`)
  }

  const isAttendee = attendees.some((attendee) => attendee === loggedInUser.username)

  const handleAttendEvent = async (e) => {
    e.preventDefault();

    if (!isAttendee) {
      try {
        const eventsAttendingFromApi = await postEventAttending(loggedInUser.user_id, loggedInUser.username, event.title);
        setAttendees((prevAttendees) => [...prevAttendees, loggedInUser.username]);
        setSuccessMessage('Successfully signed up for the event!');
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000);
      } catch (err) {
      }
    } else {
      try {
        const removeEventAttendingFromApi = await removeEventAttending(loggedInUser.user_id, event.title);
        setAttendees((prevAttendees) => prevAttendees.filter((attendee) => attendee !== loggedInUser.username));
        setSuccessMessage('Successfully opted out of the event.');
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000);
      } catch (err) {
        setIsError(true)
        setError(err.response)
      }
    }
  };

  const isValidDate = (date) => !isNaN(date.getTime());

  return (
    <article className="max-w-4xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg">

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

          <div className="flex space-x-4 mb-2">
            <p className="text-sm text-white">Type: {event.event_type}</p>
            <p className="text-sm text-white">Price: £{formatCost(event.price_in_pence)}</p>
          </div>

          {loggedInUser && organiser && loggedInUser.username !== organiser.username && (
            <button
              onClick={handleAttendEvent}
              className="mt-2 px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors duration-200"
            >
              {isAttendee ? "Opt Out Of Event" : "Sign Up For Event"}
            </button>
          )}

          {successMessage && (
            <p className="mt-2 text-green-500 font-semibold">{successMessage}</p>
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