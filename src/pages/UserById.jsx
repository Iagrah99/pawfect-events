import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvents, fetchEventsAttending, fetchUserById } from "../../utils/api";
import Loading from "../components/Loading";

const UserById = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({})
  const [eventsAttending, setEventsAttending] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { user_id } = useParams();

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const eventsFromApi = await fetchEvents();
      const userFromApi = await fetchUserById(user_id)
      const userEventsAttending = await fetchEventsAttending(user_id)
      setEvents(eventsFromApi)
      setUser(userFromApi)
      setEventsAttending(userEventsAttending)
      setIsLoading(false)
    }
    fetchData();
  }, [user_id])

  const organiserEvents = events.filter((event) => event.organiser === user.username)

  const organiserEventsNumber = organiserEvents.length;

  return (
    <>
      <NavigationBar />
      {isLoading ? <Loading content={"User Details"} /> :
        <article className="max-w-4xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg">

          <div className="flex justify-between items-center mb-4">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active className='text-white'>{user?.username}</Breadcrumb.Item>
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
                <div className="w-full md:w-3/6">
                  <img
                    src={user.avatar_url}
                    alt={`${user.username}'s profile`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="w-full md:w-3/6 md:pl-6 mt-4 md:mt-0">
                  <p className="text-2xl font-bold mb-2 text-white">
                    {user.username} <span>({user.is_organiser ? "Event Organiser" : "Member"})</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                {!user.is_organiser ? <><h2 className="text-xl font-bold mb-4 text-white">Events Attending</h2>
                  <ul className="list-disc pl-5 text-white">
                    {eventsAttending.map(event => {
                      return <li key={event} className="cursor-pointer">{event}</li>
                    }) || 'User is not attending any events'}
                  </ul></> : <><h2 className="text-xl font-bold mb-4 text-white">Events Organised</h2>
                  <ul className="list-disc pl-5 text-white">
                    {organiserEvents.map(event => {
                      return <li key={event.event_id} className="cursor-pointer hover:text-cyan-200" onClick={() => navigate(`/events/${event.event_id}`)}>{event.title}</li>
                    }) || 'User has not organised any events'}
                  </ul></>}

              </div>
            </>
          ) : (
            <p className="text-white">No user details available</p>
          )}
        </article>}
    </>
  );
}

export default UserById;
