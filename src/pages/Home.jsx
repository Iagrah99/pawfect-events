import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import { fetchEvents } from "../../utils/api"
import EventCard from "../components/EventCard";
import Error from "../components/Error";
import { useSearchParams } from "react-router-dom";
import EventControls from "../components/EventControls";

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

  const handleFilterBy = (e) => {
    if (e.target.value == "All") {
      setFilteredEvents(events)
      return;
    }
    const matchingEvents = events.filter((event) => event.event_type === e.target.value)
    console.log(matchingEvents)
    setFilteredEvents(matchingEvents.length > 0 ? matchingEvents : []);
  }

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

          <EventControls handleFilterBy={handleFilterBy} handleSortBy={handleSortBy} handleOrderBy={handleOrderBy} />

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
