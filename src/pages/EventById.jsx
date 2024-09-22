import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEventAttendees, fetchEventById, fetchUsers } from "../../utils/api";
import EventPost from "../components/EventPost";
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";

const ViewEvent = () => {

  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [attendees, setAttendees] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const eventFromApi = await fetchEventById(event_id);
      const attendeesFromApi = await fetchEventAttendees(event_id);
      const usersFromApi = await fetchUsers();
      setEvent(eventFromApi);
      setAttendees(attendeesFromApi);
      setUsers(usersFromApi)
      setIsLoading(false);
    }
    fetchData();

  }, [])

  return (
    <>
      <NavigationBar />
      {isLoading ? (<Loading content="Event Details" />) : (<EventPost event={event} attendees={attendees} users={users} />)}
    </>
  )
}

export default ViewEvent
