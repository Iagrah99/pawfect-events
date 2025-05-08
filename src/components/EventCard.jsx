import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import formatCost from "../../utils/formatCost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
  faUser,
  faLocationDot,
  faCrown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleClick = (event_id) => {
    navigate(`/events/${event_id}`);
  };

  console.log(event);

  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  return (
    <article className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 hover:opacity-75 cursor-pointer"
        onClick={() => handleClick(event.event_id)}
      />

      <div className="p-3 flex flex-col text-white">
        <div className="flex gap-1 items-center">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 leading-snug line-clamp-2">
            {event.title} -
          </h2>

          <p className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
            {/* <FontAwesomeIcon icon={faLocationDot} className="text-blue-500" />{" "} */}
            {event.location}
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <p className="flex items-center gap-2 text-sm">
            <FontAwesomeIcon icon={faCrown} className="text-yellow-500" />{" "}
            {event.organiser}
          </p>
        </div>

        <div className="flex gap-3">
          <p className="flex items-center gap-2 text-sm">
            <FontAwesomeIcon icon={faPlayCircle} className="text-green-500" />
            {format(startDate, "dd/MM/yyyy 'at' HH:mm")}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FontAwesomeIcon icon={faStopCircle} className="text-red-500" />
            {format(endDate, "dd/MM/yyyy 'at' HH:mm")}
          </p>
        </div>

        <p className="flex items-center gap-2 text-sm font-bold">
          <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" />{" "}
          {event.price_in_pence === 0
            ? "FREE"
            : `£${formatCost(event.price_in_pence)}`}
        </p>
      </div>
    </article>
  );
};

export default EventCard;
