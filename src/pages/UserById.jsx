import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useEffect, useState } from "react";
import { fetchEvents } from "../../utils/api";
import Loading from "../components/Loading";

const UserById = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const { organiserDetails } = location.state || {};

  useEffect(() => {
    setIsLoading(true)
    const fetchEventsData = async () => {
      const eventsFromApi = await fetchEvents();
      setEvents(eventsFromApi)
      setIsLoading(false)
    }
    fetchEventsData();
  }, [])

  const organiserEvents = events.filter((event) => event.organiser === organiserDetails.username)

  const organiserEventsNumber = organiserEvents.length;

  return (
    <>
      <NavigationBar />
      {isLoading ? <Loading content={"User Details"} /> :
        <article className="max-w-4xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg">

          <div className="flex justify-between items-center mb-4">
            {/* Breadcrumb */}
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active className='text-white'>{organiserDetails?.username}</Breadcrumb.Item>
            </Breadcrumb>

            {/* Back link */}
            <button
              onClick={() => navigate(-1)}
              className="text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg shadow-md"
            >
              Back
            </button>
          </div>

          {organiserDetails ? (
            <>
              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-3/6">
                  <img
                    src={organiserDetails.avatar_url}
                    alt={`${organiserDetails.username}'s profile`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="w-full md:w-3/6 md:pl-6 mt-4 md:mt-0">
                  <p className="text-2xl font-bold mb-2 text-white">
                    {organiserDetails.username}
                  </p>

                  <div className="flex space-x-4 mb-4">
                    <p className="text-sm text-white">Events Organised: {organiserEventsNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-white">Additional Info</h2>
                <p className="text-white">
                  {organiserDetails.additionalInfo || 'No additional information available'}
                </p>
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
