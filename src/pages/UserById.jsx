import { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchEvents,
  fetchEventsAttending,
  fetchUserById,
} from "../../utils/api";
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import Error from "../components/Error";
import UserCard from "../components/UserCard";
import { UserContext } from "../contexts/UserContext";
import Footer from "../components/Footer";

const UserById = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loggedInUser } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const [eventsAttending, setEventsAttending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  // State to control whether a user's information has been updated or not.
  const [isUpdated, setIsUpdated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message

  const { user_id } = useParams();
  const deletedEvent = location.state?.deletedEvent;

  useEffect(() => {
    if (deletedEvent) {
      setShowDeletedMessage(true);
      const timeoutId = setTimeout(() => {
        setShowDeletedMessage(false);
        navigate(location.pathname, { replace: true });
      }, 3000);
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
  }, [user_id, loggedInUser]);

  useEffect(() => {
    if (isUpdated) {
      setShowSuccessMessage(true);
      const timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
        setIsUpdated(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isUpdated]);

  if (isError) {
    return <Error error={error} />;
  }

  const organiserEvents = events.filter(
    (event) => event.organiser === user.username
  );

  return (
    <div className="flex flex-col min-h-dvh bg-slate-900">
      <NavigationBar />

      {isLoading ? (
        <Loading content="User Details" />
      ) : (
        <main className="flex flex-col flex-grow items-center px-4 py-12">
          <div className=" w-full max-w-4xl border-1 border-slate-800 bg-slate-900 rounded-lg lg:shadow p-6 sm:p-8 text-white">
            <UserCard
              navigate={navigate}
              user={user}
              setIsUpdated={setIsUpdated}
              events={events}
              showDeletedMessage={showDeletedMessage}
              organiserEvents={organiserEvents}
              eventsAttending={eventsAttending}
              error={error}
              setError={setError}
              setIsError={setIsError}
              showSuccessMessage={showSuccessMessage}
            />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default UserById;
