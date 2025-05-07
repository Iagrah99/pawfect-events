import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import EditUser from "./EditUser";
import { deleteUser } from "../../utils/api";
import DeletingContent from "./DeletingContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({
  navigate,
  user,
  setIsUpdated,
  events,
  showDeletedMessage,
  organiserEvents,
  eventsAttending,
  error,
  setError,
  isError,
  setIsError,
  showSuccessMessage,
}) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const handleDeleteUser = async () => {
    try {
      setIsDeletingUser(true);
      await deleteUser(user.user_id);
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
      setIsDeletingUser(false);
      navigate(`/`, { state: { userDeleted: true } });
    } catch (err) {
      setIsDeletingUser(false);
      setIsError(true);
      setError(err.response);
    }
  };

  return (
    <>
      {isDeletingUser ? (
        <DeletingContent content="User" />
      ) : (
        <>
          <div className="max-w-3xl mx-auto bg-slate-900 min-h-screen sm:min-h-fit shadow-lg sm:rounded-xl p-4 relative text-white">
            <nav className="text-md text-slate-400" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex space-x-1 sm:space-x-3">
                <li className="flex items-center">
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li>
                  <div className="flex items-center text-white">
                    <span>{user?.username}</span>
                  </div>
                </li>
              </ol>
            </nav>

            {user.username === loggedInUser?.username && (
              <div className="absolute flex sm:gap-3 top-0 right-0 sm:top-1 sm:right-2">
                <EditUser
                  user={user}
                  setIsUpdated={setIsUpdated}
                  error={error}
                  setError={setError}
                  isError={isError}
                  setIsError={setIsError}
                />
                <button
                  className="text-red-500 hover:text-red-600 transition text-xl scale-75 sm:scale-110 cursor-pointer shadow-md p-4"
                  onClick={handleDeleteUser}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}

            {user && (
              <>
                <div className="flex items-center gap-6 py-2">
                  <img
                    src={user.avatar_url}
                    alt={`${user.username}'s profile avatar`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 shadow border-gray-900"
                  />

                  <div>
                    <p className="text-base sm:text-2xl mt-2 md:mt-0 font-bold mb-2 text-white">
                      {user.username}{" "}
                      <span>
                        ({user.is_organiser ? "Event Organiser" : "Member"})
                      </span>
                    </p>
                  </div>
                </div>

                <section>
                  <h2 className="text-lg font-semibold text-slate-300 mb-3">
                    {user.is_organiser
                      ? "🗂 Events Organised"
                      : "📅 Events Attending"}
                  </h2>

                  {user.is_organiser ? (
                    organiserEvents.length ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {organiserEvents.map((event) => (
                          <div
                            key={event.event_id}
                            className="bg-slate-800 rounded-lg p-4 text-center shadow-inner border-1 border-slate-700 cursor-pointer hover:bg-slate-700 transition"
                            onClick={() =>
                              navigate(`/events/${event.event_id}`)
                            }
                          >
                            <p className="text-lg font-semibold text-white">
                              {event.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400">
                        User has not organised any events
                      </p>
                    )
                  ) : eventsAttending.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {eventsAttending.map((eventTitle) => {
                        const matchedEvent = events.find(
                          (e) => e.title === eventTitle
                        );
                        return (
                          <div
                            key={eventTitle}
                            className="bg-slate-800 rounded-lg p-4 text-center shadow-inner border-1 border-slate-700 cursor-pointer hover:bg-slate-700 transition"
                            onClick={() =>
                              matchedEvent &&
                              navigate(`/events/${matchedEvent.event_id}`)
                            }
                          >
                            <p className="text-lg font-semibold text-white">
                              {eventTitle}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-400">
                      User is not attending any events
                    </p>
                  )}
                </section>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserCard;
