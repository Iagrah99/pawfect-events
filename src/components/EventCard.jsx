import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import formatCost from "../../utils/formatCost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
  faPoundSign,
} from "@fortawesome/free-solid-svg-icons";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleClick = (event_id) => {
    navigate(`/events/${event_id}`);
  };

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
        <h2 className="text-lg sm:text-xl font-semibold mb-3 leading-snug line-clamp-2">
          {event.title} - {event.location}
        </h2>

        <div>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPlayCircle} />
            {format(startDate, "dd/MM/yyyy 'at' HH:mm")}
          </p>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStopCircle} />
            {format(endDate, "dd/MM/yyyy 'at' HH:mm")}
          </p>
        </div>

        <p className="flex items-center gap-2 text-lg font-bold">
          <FontAwesomeIcon icon={faPoundSign} />{" "}
          {event.price_in_pence === 0
            ? "FREE"
            : `£${formatCost(event.price_in_pence)}`}
        </p>
      </div>
    </article>
  );
};

export default EventCard;
