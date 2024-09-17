import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar";
import { fetchEvents } from "../../utils/api"
import { format } from 'date-fns'

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsFromApi = await fetchEvents();
      setEvents(eventsFromApi)
    }
    fetchData();
  }, [])

  return (
    <Container fluid="xs">
      <NavigationBar />
      <header className="text-5xl my-5 text-center">
        <h1>Avaliable Events</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3 sm:px-1">

        {events.map((event) => {
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
          );
        })}
      </main>
    </Container>

  )
}

export default Home
