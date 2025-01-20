import { format, isSameDay } from 'date-fns'
import { useNavigate } from "react-router-dom"
import formatCost from '../../utils/formatCost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTags, faPoundSign } from '@fortawesome/free-solid-svg-icons';

const EventCard = ({ event }) => {

  const navigate = useNavigate()
  const handleClick = (event_id) => {
    navigate(`/events/${event_id}`)
  }

  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);


  return (
    <article onClick={() => handleClick(event.event_id)}
      className="bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-gray-800 transition duration-150"
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full max-h-64 object-cover object-top"
      />

      <div className="p-4 flex flex-col gap-3 text-white">
        <h3 className="text-white text-3xl font-semibold">{event.title} - {event.location}</h3>
        <p>
          <FontAwesomeIcon icon={faClock} className="mr-2 align-middle" />
          {format(startDate, "EEEE, do MMMM yyyy 'from' h:mmaaa") +
            " - " +
            (isSameDay(startDate, endDate)
              ? format(endDate, "h:mmaaa")
              : format(endDate, "EEEE, do MMMM 'at' h:mmaaa"))}
        </p>

        <p className="text-lg font-bold">
          <FontAwesomeIcon icon={faPoundSign} className="mr-2 align-middle" /> Cost: {event.price_in_pence === 0 ? "FREE" : `£${formatCost(event.price_in_pence)}`}
        </p>
      </div>
    </article>
  )
}

export default EventCard
