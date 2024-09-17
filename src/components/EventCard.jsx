import { format } from 'date-fns'

const EventCard = ({ event }) => {
  return (
    <article
      key={event.event_id}
      className="bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full max-h-64 object-cover"
      />
      <div className="p-4 flex flex-col gap-3 text-white">
        <h3 className="text-white text-3xl font-semibold">{event.title} - {event.location}</h3>
        <p>Starts: {format(event.start_date, "EEEE, do MMMM yyyy 'at' h:mmaaa")}</p>
        <p>Ends: {format(event.end_date, "EEEE, do MMMM yyyy 'at' h:mmaaa")}</p>
        <p className="text-sm">Event Type: {event.event_type}</p>
        <p className="text-lg font-bold">Cost: £{(event.price_in_pence / 100).toFixed(2)}</p>
      </div>
    </article>
  )
}

export default EventCard
