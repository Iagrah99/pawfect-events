import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import EditUser from "./EditUser";
import { deleteUser } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./DeleteUser";

const UserCard = ({
  navigate,
  user,
  setIsUpdated,
  events,
  organiserEvents,
  eventsAttending,
  error,
  setError,
  isError,
  setIsError,
}) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const toggleDeleteUserModal = () => {
    setIsDeleteUserModalOpen((prev) => !prev);
  };
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
    <article className="max-w-4xl mx-auto bg-slate-900 overflow-hidden text-white">
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <img
          src={user.avatar_url}
          alt={`${user.username}'s profile avatar`}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-1 border-slate-800"
        />
        <div className="flex flex-col md:items-center md:flex-row">
          <h2 className="text-2xl font-bold text-white mr-2 mb-0">
            {user.username}{" "}
          </h2>
          <span className="text-lg lg:text-2xl font-medium text-slate-300">
            ({user.is_organiser ? "Event Organiser" : "Member"})
          </span>
        </div>
      </div>

      <section className="flex flex-col items-start lg:border-y-2 border-slate-800 lg:mb-3 p-4 ">
        <h3 className="text-xl font-semibold text-slate-300 mb-4">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="mr-2 text-orange-500"
          />
          {user.is_organiser ? "Events Organising" : "Events Attending"}
        </h3>

        {user.is_organiser ? (
          (() => {
            const attendingEvents = events
              .filter((e) => eventsAttending.includes(e.title))
              .filter(
                (e) => !organiserEvents.some((o) => o.event_id === e.event_id)
              );

            return (
              <>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Organising
                </h3>
                {organiserEvents.length ? (
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    {organiserEvents.map((event) => (
                      <li
                        key={event.event_id}
                        className="text-white cursor-pointer w-fit"
                        onClick={() => navigate(`/events/${event.event_id}`)}
                      >
                        <span className="lg:hover:text-orange-400 transition">
                          {event.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 mb-6">
                    User has not organised any events
                  </p>
                )}

                <h3 className="text-lg font-semibold text-white mb-2">
                  Attending
                </h3>
                {attendingEvents.length ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {attendingEvents.map((event) => (
                      <li
                        key={event.event_id}
                        className="text-white cursor-pointer w-fit"
                        onClick={() => navigate(`/events/${event.event_id}`)}
                      >
                        <span className="lg:hover:text-orange-400 transition">
                          {event.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">
                    User is not attending any other events
                  </p>
                )}
              </>
            );
          })()
        ) : eventsAttending.length ? (
          <ul className="list-disc pl-5 space-y-2">
            {eventsAttending.map((eventTitle) => {
              const matchedEvent = events.find((e) => e.title === eventTitle);
              return (
                <li
                  key={eventTitle}
                  className="text-white lg:hover:text-orange-400 transition cursor-pointer w-fit"
                  onClick={() =>
                    matchedEvent && navigate(`/events/${matchedEvent.event_id}`)
                  }
                >
                  {eventTitle}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate-400">User is not attending any events</p>
        )}
      </section>

      {user.username === loggedInUser?.username && (
        <div className="flex w-fit md:w-full justify-start gap-2 mx-auto p-2 mb-2 lg:p-4 lg:pt-2">
          <EditUser
            user={user}
            setIsUpdated={setIsUpdated}
            error={error}
            setError={setError}
            isError={isError}
            setIsError={setIsError}
          />
          <button
            onClick={toggleDeleteUserModal}
            className="flex items-center gap-2 border-1 border-slate-800 lg:hover:border-slate-700 text-white bg-slate-900 px-3 py-2 rounded-md shadow-md text-sm lg:text-base"
          >
            <FontAwesomeIcon icon={faTrash} className="text-orange-500" />
            <span>Delete Account</span>
          </button>
        </div>
      )}

      {isDeleteUserModalOpen && (
        <DeleteUser
          toggleDeleteUserModal={toggleDeleteUserModal}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </article>
  );
};

export default UserCard;
