import { format } from 'date-fns'
import { useNavigate } from "react-router-dom"
import formatCost from '../../utils/formatCost'

const EventCard = ({ event }) => {

  const navigate = useNavigate()
  const handleClick = (event_id) => {
    navigate(`/events/${event_id}`)
  }

  return (
    <article onClick={() => handleClick(event.event_id)}
      className="bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-gray-800 transition duration-150"
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full max-h-64 object-cover"
      />
      <div className="p-4 flex flex-col gap-3 text-white">
        <h3 className="text-white text-3xl font-semibold">{event.title} - {event.location}</h3>
        <p>{format(event.start_date, "EEEE, do MMMM yyyy 'from' h:mmaaa") + " - " + format(event.end_date, "h:mmaaa")}</p>
        <p className="text-sm">Event Type: {event.event_type}</p>
        <p className="text-lg font-bold">Cost: £{formatCost(event.price_in_pence)}</p>
      </div>
    </article>
  )
}

export default EventCard
