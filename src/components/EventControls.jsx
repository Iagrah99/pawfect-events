import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const EventControls = ({ handleSortBy, handleOrderBy }) => {
  return (
    <div className=" p-4 rounded-lg mb-6 flex flex-row justify-center items-center gap-3 md:gap-0 md:space-y-0 md:space-x-3">
      <div className="flex flex-col items-center relative w-fit">
        <select
          className="appearance-none bg-slate-800 text-white lg:px-3 py-2 sm:py-2 pl-3 pr-8 lg:w-60 sm:w-32 w-full border-transparent text-sm cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
          defaultValue="sort_by"
          onChange={handleSortBy}
        >
          <option value="sort_by" disabled>
            Sort by
          </option>
          <option value="title" id="title">
            Title
          </option>
          <option value="price_in_pence" title="price_in_pence">
            Price
          </option>
          <option value="start_date" title="start_date">
            Start Date
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
          <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
        </div>
      </div>

      <div className="flex flex-col items-center relative w-fit">
        <select
          className="appearance-none bg-slate-800 text-white lg:px-3 py-2 sm:py-2 pl-3 pr-8 lg:w-60 sm:w-32 w-full border-transparent text-sm cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
          defaultValue="order_by"
          onChange={handleOrderBy}
        >
          <option value="order_by" disabled>
            Order by
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
          <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
        </div>
      </div>
    </div>
  );
};

export default EventControls;
