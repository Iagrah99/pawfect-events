const EventControls = ({ handleFilterBy, handleSortBy, handleOrderBy }) => {
  return (
    <div className=" p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">

      <div className="flex flex-col">

        <select id="filterBy" className="mt-1 p-2 block w-full md:w-52 bg-zinc-900 md:bg-zinc-800  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          defaultValue=""
          onChange={(e) => handleFilterBy(e)}>
          <option value="" disabled>
            Filter by Event Type
          </option>
          <option value="All">All Events</option>
          <option value="Dog Training">Dog Training</option>
          <option value="Dog Walking">Dog Walking</option>
          <option value="Dog Show">Dog Show</option>
          <option value="Dog Competition">Dog Competition</option>
          <option value="Agility Trials">Agility Trials</option>
          <option value="Herding Trials">Herding Trials</option>
        </select>
      </div>

      <div className="flex flex-col">
        <select id="sortBy" className="mt-1 p-2 block w-full md:w-52 bg-zinc-900 md:bg-zinc-800 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          defaultValue=""
          onChange={(e) => handleSortBy(e)}>
          <option value="" disabled>
            Sort by
          </option>
          <option value="title">Title</option>
          <option value="price_in_pence">Price</option>
          <option value="start_date">Start Date</option>
        </select>
      </div>

      <div className="flex flex-col">
        <select id="orderBy" className="mt-1 p-2 block w-full md:w-52 bg-zinc-900 md:bg-zinc-800 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          defaultValue=""
          onChange={(e) => handleOrderBy(e)}>
          <option value="" disabled>
            Order by
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}

export default EventControls
