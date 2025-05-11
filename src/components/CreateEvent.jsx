import { useState, useContext } from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { postEvent } from "../../utils/api";
import Error from "./Error";

const CreateEvent = () => {
  const { loggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventCategory, setEventCategory] = useState("Dog-Training");
  const [priceInPence, setPriceInPence] = useState(0);
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [isPostingEvent, setIsPostingEvent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        console.error("Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Move this to the top to prevent default behavior first

    const eventData = {
      title,
      organiser: loggedInUser.username,
      description,
      start_date: new Date(eventStart).toISOString(),
      end_date: new Date(eventEnd).toISOString(),
      category: eventCategory,
      price_in_pence: priceInPence,
      location,
      image: imageUrl,
    };

    try {
      setIsError(false);
      setError(null);
      setIsPostingEvent(true);

      const postedEvent = await postEvent(eventData);

      setIsPostingEvent(false);
      navigate(`/events/${postedEvent.event_id}`);
    } catch (err) {
      setIsError(true);
      setError(err.response);
      setIsPostingEvent(false);
    }
  };

  if (isError) {
    return <Error error={error} />;
  }

  if (!loggedInUser || !loggedInUser.is_organiser) {
    return (
      <>
        <NavigationBar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)] bg-slate-900">
          <div className="bg-gray-800 p-6 space-x-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg text-gray-100">
              {!loggedInUser
                ? "You must be logged in to create an event."
                : "You lack sufficient privileges"}
            </h2>

            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="ml-2">Go Back</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
            >
              <FontAwesomeIcon icon={faHomeAlt} />
              <span className="ml-2">Back To Home</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <NavigationBar />

      <main className="flex justify-center items-center flex-grow bg-slate-900 py-8">
        <div className="w-full max-w-lg border-1 border-slate-800 md:bg-slate-900 rounded-lg lg:shadow p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
            Create Your <em>Pawfect</em> Event!
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <p className="text-center text-gray-300 text-sm">
              Fields marked with <span className="text-orange-400">*</span> are
              required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1 text-gray-300"
                >
                  Title <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
                  placeholder="Enter event title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="organiser"
                  className="block text-sm font-medium mb-1 text-gray-300"
                >
                  Organiser <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  id="organiser"
                  className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm text-gray-400 cursor-not-allowed"
                  value={loggedInUser.username}
                  disabled
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Description <span className="text-orange-400">*</span>
              </label>
              <textarea
                id="description"
                className="resize-none mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
                placeholder="Describe the event"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-1 text-gray-300"
                >
                  Start Date <span className="text-orange-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100"
                  required
                  onChange={(e) => setEventStart(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-1 text-gray-300"
                >
                  End Date <span className="text-orange-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100"
                  required
                  onChange={(e) => setEventEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="eventCategory"
                  className="block text-sm font-medium mb-1 text-gray-300"
                >
                  Event Category <span className="text-orange-400">*</span>
                </label>
                <select
                  id="eventCategory"
                  className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  onChange={(e) => setEventCategory(e.target.value)}
                >
                  <option value="Dog-Training">Dog Training</option>
                  <option value="Dog-Walking">Dog Walking</option>
                  <option value="Dog-Show">Dog Show</option>
                  <option value="Dog-Competition">Dog Competition</option>
                  <option value="Agility-Trial">Agility Trial</option>
                  <option value="Herding-Trial">Herding Trial</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="priceInPence"
                  className="block text-sm font-medium mb-1 text-gray-300"
                >
                  Price Per Ticket (£){" "}
                  <span className="text-orange-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="priceInPence"
                  placeholder="Enter price"
                  className="pl-14 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
                  required
                  onChange={(e) =>
                    setPriceInPence(Math.round(e.target.value * 100))
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Location <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter location"
                required
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm text-gray-100 hover:cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) handleImageUpload(file);
                }}
              />
            </div>

            <button
              type="submit"
              className="text-sm sm:text-base w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-1 border-orange-600 bg-orange-800 text-white font-medium shadow transition
              hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-slate-900 focus:border-orange-100"
            >
              {isPostingEvent ? "Posting Event..." : "Create Event"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;
