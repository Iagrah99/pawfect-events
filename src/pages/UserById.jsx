import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchEvents, fetchEventsAttending, fetchUserById } from "../../utils/api";
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import Error from "../components/Error";
import UserCard from "../components/UserCard";

const UserById = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const [eventsAttending, setEventsAttending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const { user_id } = useParams();
  const deletedEvent = location.state?.deletedEvent;

  useEffect(() => {
    if (deletedEvent) {
      // Show the message when the component first loads
      setShowDeletedMessage(true);

      // Hide the message after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowDeletedMessage(false);

        // Clear the deletedEvent from history state using navigate with replace: true
        navigate(location.pathname, { replace: true }); // This clears the state but stays on the same page
      }, 3000);

      // Clear timeout when the component unmounts or re-renders
      return () => clearTimeout(timeoutId);
    }
  }, [deletedEvent, location.pathname, navigate]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsError(false);
        setError(null);
        const eventsFromApi = await fetchEvents();
        const userFromApi = await fetchUserById(user_id);
        const userEventsAttending = await fetchEventsAttending(user_id);
        setEvents(eventsFromApi);
        setUser(userFromApi);
        setEventsAttending(userEventsAttending);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
        setError(err.response);
      }
    };
    fetchData();
  }, [user_id]);

  if (isError) {
    return <Error error={error} />;
  }

  const organiserEvents = events.filter((event) => event.organiser === user.username);

  return (
    <>
      <NavigationBar />
      {isLoading ? (
        <Loading content={"User Details"} />
      ) : (
        <UserCard navigate={navigate} user={user} showDeletedMessage={showDeletedMessage} organiserEvents={organiserEvents} eventsAttending={eventsAttending} />
      )}
    </>
  );
};

export default UserById;
