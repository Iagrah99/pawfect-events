import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchEvents, fetchEventsAttending, fetchUserById } from "../../utils/api";
import Loading from "../components/Loading";
import Error from "../components/Error";

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
        <article className="max-w-5xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">
                {user?.username}
              </Breadcrumb.Item>
            </Breadcrumb>

            <button
              onClick={() => navigate(-1)}
              className="text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg shadow-md"
            >
              Back
            </button>
          </div>

          {user ? (
            <>
              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3">
                  <img
                    src={user.avatar_url}
                    alt={`${user.username}'s profile`}
                    className="w-full h-auto rounded-lg border-2 border-gray-900"
                  />
                </div>

                <div className="w-full md:w-2/3 md:pl-6 mt-0 md:mt-0">
                  <p className="text-2xl font-bold mb-2 text-white">
                    {user.username} <span>({user.is_organiser ? "Event Organiser" : "Member"})</span>
                  </p>

                  {/* Show the message if it's visible */}
                  {showDeletedMessage && (
                    <p className="mt-3 text-green-500 font-semibold">
                      The event has been successfully deleted!
                    </p>
                  )}

                  <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                    {!user.is_organiser ? (
                      <>
                        <h2 className="text-xl font-bold mb-4 text-white">Events Attending</h2>
                        <ul className={`list-disc text-white ${eventsAttending.length ? 'pl-5' : 'pl-0'}`}>
                          {eventsAttending.length ? (
                            eventsAttending.map((event) => (
                              <li key={event} className="cursor-pointer hover:text-cyan-200"
                                onClick={() => {
                                  const matchedEvent = events.find(e => e.title === event)
                                  navigate(`/events/${matchedEvent.event_id}`)
                                }}>
                                {event}
                              </li>
                            ))
                          ) : (
                            <p>User is not attending any events</p>
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h2 className="text-xl font-bold mb-4 text-white">Events Organised</h2>
                        <ul className={`list-disc text-white ${eventsAttending.length ? 'pl-5' : 'pl-0'}`}>
                          {organiserEvents.length ? (
                            organiserEvents.map((event) => (
                              <li
                                key={event.event_id}
                                className="cursor-pointer hover:text-cyan-200"
                                onClick={() => {
                                  navigate(`/events/${event.event_id}`)
                                }}
                              >
                                {event.title}
                              </li>
                            ))
                          ) : (
                            <p>User has not organised any events</p>
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white">No user details available</p>
          )}
        </article>
      )}
    </>
  );
};

export default UserById;
