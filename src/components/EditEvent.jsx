import { useState, useEffect } from "react";
import { UpdateEvent } from "../../utils/api";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditEvent = ({
  event,
  setIsUpdated,
  error,
  setError,
  setIsError,
}) => {
  const [show, setShow] = useState(false);
  const [editedTitle, setEditedTitle] = useState(event.title);
  const [editedDescription, setEditedDescription] = useState(event.description);
  const [editedStartDate, setEditedStartDate] = useState(event.start_date);
  const [editedEndDate, setEditedEndDate] = useState(event.end_Date);
  const [editedEventType, setEditedEventType] = useState(event.event_type);
  const [editedPriceInPence, setEditedPriceInPence] = useState(
    event.price_in_pence
  );
  const [editedLocation, setEditedLocation] = useState(event.location);
  const [editedImageUrl, setEditedImageUrl] = useState(event.image);
  const [editedImageFile, setEditedImageFile] = useState(null);

  useEffect(() => {
    if (show) {
      setEditedTitle(event.title);
      setEditedDescription(event.description);
      setEditedStartDate(event.start_date);
      setEditedEndDate(event.end_date);
      setEditedEventType(event.event_type);
      setEditedPriceInPence(event.price_in_pence);
      setEditedLocation(event.location);
      setEditedImageUrl(event.image);
    }
  }, [show]);

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
        setEditedImageUrl(data.data.url);
      } else {
        console.error("Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleClose = () => {
    setShow(false);
    // Revert back to original values
    setEditedTitle(event.title);
    setEditedDescription(event.description);
    setEditedStartDate(event.start_date);
    setEditedEndDate(event.end_date);
    setEditedEventType(event.event_type);
    setEditedPriceInPence(event.price_in_pence);
    setEditedLocation(event.location);
    setEditedImageUrl(event.image);
  };

  const editEvent = async ({ event_id }) => {
    setIsUpdated(true);
    try {
      const editedEvent = {
        title: editedTitle,
        description: editedDescription,
        start_date: new Date(editedStartDate).toISOString(),
        end_date: new Date(editedEndDate).toISOString(),
        event_type: editedEventType,
        price_in_pence: editedPriceInPence,
        location: editedLocation,
        image: editedImageUrl,
      };

      await UpdateEvent(event_id, editedEvent);
      setShow(false);
      setIsUpdated(false);
    } catch (err) {
      setIsError(true);
      setError(err.response);
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
        onClick={() => setShow(true)}
      >
        Edit
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-900 text-white w-full max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 relative">
              <h2 className="text-xl font-semibold">Edit Event</h2>
              <button onClick={handleClose} className="text-white text-3xl absolute top-5 right-5">
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-3 items-center">
                <div className="w-full">
                  <label className="block mb-1">Title</label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full p-2 bg-slate-700 border-slate-600 rounded-md text-white"
                  />
                </div>

                <div className="w-full">
                  <label className="block mb-1">Organiser</label>
                  <input
                    type="text"
                    value={event.organiser}
                    disabled
                    className="w-full p-2 bg-slate-800 border-slate-600 text-gray-400 rounded-md cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full min-h-32 p-2 bg-slate-700 border-slate-600 rounded-md text-white resize-none"
                />
              </div>

              <div className="flex gap-3 items-center">
                <div className="relative w-full">
                  <label className="block mb-1">Start Date</label>
                  <input
                    type="datetime-local"
                    value={editedStartDate}
                    onChange={(e) => setEditedStartDate(e.target.value)}
                    className="w-full p-2 pr-10 bg-slate-700 border-slate-600 rounded-md text-white appearance-none cursor-text"
                  />
                  <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-200 pointer-events-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </span>
                </div>

                <div className="relative w-full">
                  <label className="block mb-1">End Date</label>
                  <input
                    type="datetime-local"
                    value={editedEndDate}
                    onChange={(e) => setEditedEndDate(e.target.value)}
                    className="w-full p-2 pr-10 bg-slate-700 border-slate-600 rounded-md text-white appearance-none cursor-text"
                  />
                  <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-200 pointer-events-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="relative w-full">
                  <label className="block mb-1">Event Type</label>
                  <select
                    value={editedEventType}
                    onChange={(e) => setEditedEventType(e.target.value)}
                    className="w-full p-2 bg-slate-700 border-slate-600 rounded-md text-white cursor-pointer"
                  >
                    <option value="Dog Training">Dog Training</option>
                    <option value="Dog Walking">Dog Walking</option>
                    <option value="Dog Show">Dog Show</option>
                    <option value="Dog Competition">Dog Competition</option>
                    <option value="Agility Trials">Agility Trials</option>
                    <option value="Herding Trials">Herding Trials</option>
                  </select>
                </div>

                <div className="relative w-full">
                  <label className="block mb-1">Price (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editedPriceInPence}
                    onChange={(e) => setEditedPriceInPence(e.target.value)}
                    className="w-full p-2 bg-slate-700 border-slate-600 rounded-md text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="relative w-full">
                  <label className="block mb-1">Location</label>
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                    className="w-full p-2 bg-slate-700 border-slate-600 rounded-md text-white"
                  />
                </div>

                <div  className="relative w-full">
                  <label className="block mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setEditedImageFile(file);
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                    className="block w-56 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-base file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 file:cursor-pointer rounded-lg pointer-events-none file:pointer-events-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-2 px-6 py-4 bg-slate-900 border-t border-slate-700">
              {/* <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Close
              </button> */}
              <button
                onClick={() => editEvent(event)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
