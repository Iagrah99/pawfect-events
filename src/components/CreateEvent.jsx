import { useState, useContext } from 'react';
import NavigationBar from './NavigationBar';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { postEvent } from '../../utils/api';
import PostingEvent from './PostingEvent';
import Error from './Error';

const CreateEvent = () => {
  const { loggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [eventType, setEventType] = useState('Dog Training');
  const [priceInPence, setPriceInPence] = useState(0);
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [isPostingEvent, setIsPostingEvent] = useState(false);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const handleImageUpload = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        console.error('Image upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Move this to the top to prevent default behavior first

    const eventData = {
      title,
      organiser: loggedInUser.username,
      description,
      start_date: new Date(eventStart).toISOString(),
      end_date: new Date(eventEnd).toISOString(),
      event_type: eventType,
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
    return (<Error error={error} />)
  }

  if (!loggedInUser || !loggedInUser.is_organiser) {
    return (
      <>
        <NavigationBar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)] bg-slate-900">
          <div className="bg-gray-800 p-6 space-x-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg text-gray-100">{!loggedInUser ? "You must be logged in to create an event." : "You lack sufficient privileges"}</h2>

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
    <>
      <NavigationBar />
      {isPostingEvent ? <PostingEvent /> :
        <div className="flex justify-center items-center py-8 bg-gray-900 min-h-screen md:pb-96">
          <div className="w-full max-w-lg md:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">Create Your <em>Pawfect</em> Event!</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <p className='text-center text-gray-300'>Input fields marked with an <span className="text-indigo-400">*</span> indicate a required field.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-300">
                    Title <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                    placeholder="Enter event title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="organiser" className="block text-sm font-medium mb-1 text-gray-300">
                    Organiser <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organiser"
                    className="mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400 hover:cursor-not-allowed"
                    placeholder="Enter organiser name"
                    required
                    value={loggedInUser.username}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-300">
                  Description <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  id="description"
                  className="resize-none mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                  placeholder="Describe the event"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-1 text-gray-300">
                    Start Date <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type='datetime-local'
                    id="startDate"
                    className="mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                    required
                    onChange={(e) => setEventStart(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1 text-gray-300">
                    End Date <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    className="mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                    required
                    onChange={(e) => setEventEnd(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1 text-gray-300">
                    Event Type <span className="text-indigo-400">*</span>
                  </label>
                  <select className="mt-1 p-2 block w-full md:w-52 bg-gray-700 border-gray-300 text-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
                    onChange={(e) => setEventType(e.target.value)}>
                    <option value="Dog Training">Dog Training</option>
                    <option value="Dog Walking">Dog Walking</option>
                    <option value="Dog Show">Dog Show</option>
                    <option value="Dog Competition">Dog Competition</option>
                    <option value="Agility Trials">Agility Trials</option>
                    <option value="Herding Trials">Herding Trials</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priceInPence" className="block text-sm font-medium mb-1 text-gray-300">
                    Price Per Ticket (£) <span className="text-indigo-400">*</span>
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="priceInPence"
                    className="pl-14 w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                    placeholder="Enter price"
                    required
                    onChange={(e) => setPriceInPence(Math.round(e.target.value * 100))}
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1 text-gray-300">
                    Location <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                    placeholder="Enter location"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1 text-gray-300">
                  Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="mt-1 block w-full p-2 bg-gray-700 border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 hover:cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default CreateEvent;
