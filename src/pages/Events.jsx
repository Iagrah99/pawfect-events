import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import { fetchEvents } from "../../utils/api";
import EventCard from "../components/EventCard";
import Error from "../components/Error";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import EventControls from "../components/EventControls";
import Footer from "../components/Footer";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const userDeleted = location.state?.userDeleted;

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery =
    searchParams.get("order_by") && searchParams.get("order_by").toUpperCase();
  const categoryQuery = searchParams.get("category");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (userDeleted) {
      setShowDeletedMessage(true);
      const timeoutId = setTimeout(() => {
        setShowDeletedMessage(false);
        navigate(location.pathname, { replace: true });
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [userDeleted, location.pathname, navigate]);

  useEffect(() => {
    try {
      setIsError(false);
      const fetchData = async () => {
        const fetchedEvents = await fetchEvents(
          sortByQuery,
          orderByQuery,
          categoryQuery
        );
        console.log(fetchedEvents);
        setEvents(fetchedEvents);
        setIsLoading(false);
      };
      fetchData();
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setError(err.response);
    }
  }, [sortByQuery, orderByQuery, categoryQuery]);

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSearchParams(newParams);
  };

  const handleOrderBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", e.target.value);
    setSearchParams(newParams);
  };

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="bg-slate-900 flex flex-col min-h-screen">
      <NavigationBar />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header className="text-white text-5xl mt-5 text-center">
            <h1 className="text-3xl">
              {categoryQuery
                ? categoryQuery.split("-").join(" ") + " Events"
                : "All Events"}
            </h1>
          </header>

          {showDeletedMessage && (
            <p className="mt-3 text-center text-green-500 font-semibold">
              user account was successfully deleted.
            </p>
          )}

          <EventControls
            handleSortBy={handleSortBy}
            handleOrderBy={handleOrderBy}
          />

          <div className="w-full px-0 sm:px-4 md:px-6 xl:px-0 max-w-7xl mx-auto">
            <main className="bg-slate-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 sm:px-1 md:gap-3 md:px-3 md:pb-3">
              {!events.length ? (
                <p className="text-center col-span-full text-white">
                  No events found.
                </p>
              ) : (
                events.map((event) => (
                  <EventCard key={event.event_id} event={event} />
                ))
              )}
            </main>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Events;
