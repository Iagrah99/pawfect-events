import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import EditUser from './EditUser';
import { deleteUser } from '../../utils/api';

const UserCard = ({ navigate, user, setIsUpdated, events, showDeletedMessage, organiserEvents, eventsAttending, error, setError, isError, setIsError, showSuccessMessage }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.user_id)
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
      navigate(`/`, { state: { userDeleted: true } })
    } catch (err) {
      setIsError(true)
      setError(err.response);
    }
  }

  return (
    <article className="max-w-5xl mx-auto mt-5 p-6 bg-gray-900 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            {user?.username}
          </Breadcrumb.Item>
        </Breadcrumb>

        {loggedInUser ? user.username === loggedInUser.username && (
          <div className='space-x-3 flex items-center '>
            <EditUser user={user} setIsUpdated={setIsUpdated} error={error} setError={setError} isError={isError} setIsError={setIsError} />
            <button
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          </div>
        ) : null}
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

              {showSuccessMessage && (
                <p className="mt-3 text-green-500 font-semibold">
                  User information updated successfully!
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
  )
}

export default UserCard
