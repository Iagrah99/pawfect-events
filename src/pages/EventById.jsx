import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEventAttendees, fetchEventById, fetchUsers } from "../../utils/api";
import EventPost from "../components/EventPost";
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import Error from "../components/Error"

const ViewEvent = () => {

  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [attendees, setAttendees] = useState([]);
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        setIsError(false)
        setError(null)
        const eventFromApi = await fetchEventById(event_id);
        const attendeesFromApi = await fetchEventAttendees(event_id);
        const usersFromApi = await fetchUsers();
        setEvent(eventFromApi);
        setAttendees(attendeesFromApi);
        setUsers(usersFromApi)
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false)
        setIsError(true)
        setError(err.response)
      }
    }
    fetchData();
  }, [setAttendees])

  if (isError) {
    return <Error error={error} />
  }

  return (
    <>
      <NavigationBar />
      {isLoading ? (<Loading content="Event Details" />) : (<EventPost event={event} attendees={attendees} setAttendees={setAttendees} users={users} setIsError={setIsError} isError={isError} setError={setError} error={error} />)}
    </>
  )
}

export default ViewEvent
