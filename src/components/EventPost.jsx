import { format } from 'date-fns';
import formatCost from '../../utils/formatCost';

const EventPost = ({ event }) => {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const isValidDate = (date) => !isNaN(date.getTime());

  return (
    <article className="max-w-4xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg flex min-h-full justify-center items-center">
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
          <p className="text-white mb-4">Organised by: {event.organiser}</p>
          <p className="text-white mb-4">{event.description}</p>

          <div className="mb-4">
            <p><span className="font-bold"></span> {isValidDate(startDate) && isValidDate(endDate) ? format(startDate, "EEEE, do MMMM yyyy 'from' h:mmaaa") + " - " + format(endDate, "h:mmaaa") : 'Invalid date'}</p>
          </div>

          <div className="flex space-x-4 mb-4">
            <p className="text-sm text-white">Type: {event.event_type}</p>
            <p className="text-sm text-white">Price: £{formatCost(event.price_in_pence)}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventPost;
