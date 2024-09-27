import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import { fetchEvents } from "../../utils/api"
import EventCard from "../components/EventCard";
import Error from "../components/Error";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order_by") && searchParams.get("order_by").toUpperCase();

  useEffect(() => {
    setIsLoading(true)
    try {
      setIsError(false)
      setError(null)
      const fetchData = async () => {
        const eventsFromApi = await fetchEvents(sortByQuery, orderByQuery);
        setEvents(eventsFromApi)
        setIsLoading(false)
      }
      fetchData();
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
      setError(err.response)
      console.log(err.response)
    }
  }, [sortByQuery, orderByQuery])

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSearchParams(newParams);
  };

  const handleOrderBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", e.target.value);
    setSearchParams(newParams);
  }

  const handleFilterBy = (e) => {
    if (e.target.value == "All") {
      setFilteredEvents(events)
      return;
    }
    const matchingEvents = events.filter((event) => event.event_type === e.target.value)
    console.log(matchingEvents)
    setFilteredEvents(matchingEvents.length > 0 ? matchingEvents : []);
  }

  if (isError) {
    return (<Error error={error} />)
  }

  return (
    <Container fluid="xs">
      <NavigationBar />
      {isLoading ? (
        <Loading content="Events" />
      ) : (
        <>
          <header className="text-5xl my-5 text-center">
            <h1>Available Events</h1>
          </header>

          <div className=" p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">

            <div className="flex flex-col">

              <select id="filterBy" className="mt-1 p-2 block w-full md:w-52 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
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
              <select id="sortBy" className="mt-1 p-2 block w-full md:w-52 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
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
              <select id="orderBy" className="mt-1 p-2 block w-full md:w-52 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
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

          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3 sm:px-1 pb-3">
            {filteredEvents && filteredEvents.length === 0 ? (
              <p className="text-center col-span-full">No events found for the selected event type.</p>
            ) : (
              (filteredEvents && filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
                <EventCard key={event.event_id} event={event} />
              ))
            )}
          </main>

        </>
      )}
    </Container>
  );

}

export default Home
