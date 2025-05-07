const EventControls = ({ handleSortBy, handleOrderBy }) => {
  return (
    <div className=" p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="flex flex-col">
        <select
          className=" mt-1 p-2 block w-full md:w-52 bg-slate-900 md:bg-slate-800 text-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
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
      </div>

      <div className="flex flex-col">
        <select
          className="mt-1 p-2 block w-full md:w-52 bg-slate-900 md:bg-slate-800 text-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          defaultValue="order_by"
          onChange={handleOrderBy}
        >
          <option value="order_by" disabled>
            Order by
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default EventControls;
