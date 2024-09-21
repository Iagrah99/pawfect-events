import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import { fetchEvents } from "../../utils/api"
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const eventsFromApi = await fetchEvents();
      setEvents(eventsFromApi)
      setIsLoading(false)
    }
    fetchData();
  }, [])

  return (
    <Container fluid="xs">
      <NavigationBar />
      {isLoading ? (<Loading content="Events" />) : (
        <>
          <header className="text-5xl my-5 text-center">
            <h1>Available Events</h1>
          </header>
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3 sm:px-1">

            {events.map((event) => {
              return (
                <EventCard key={event.event_id} event={event} />
              );
            })}
          </main>
        </>)}
    </Container>
  )
}

export default Home
