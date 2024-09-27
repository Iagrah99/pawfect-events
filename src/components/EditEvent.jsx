import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { UpdateEvent } from '../../utils/api';

export const EditEvent = ({ event, setIsUpdated, error, setError, setIsError }) => {

  const [show, setShow] = useState(false);
  const [editedTitle, setEditedTitle] = useState(event.title);
  const [editedDescription, setEditedDescription] = useState(event.description);
  const [editedStartDate, setEditedStartDate] = useState(event.start_date);
  const [editedEndDate, setEditedEndDate] = useState(event.end_Date);
  const [editedEventType, setEditedEventType] = useState(event.event_type);
  const [editedPriceInPence, setEditedPriceInPence] = useState(event.price_in_pence);
  const [editedLocation, setEditedLocation] = useState(event.location);
  const [editedImageUrl, setEditedImageUrl] = useState(event.image);
  const [editedImageFile, setEditedImageFile] = useState(null)

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
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setEditedImageUrl(data.data.url);
      } else {
        console.error('Image upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
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
    setEditedImageUrl(event.image)
  };

  const editEvent = async ({ event_id }) => {
    setIsUpdated(true)
    try {

      const editedEvent = {
        title: editedTitle,
        description: editedDescription,
        start_date: new Date(editedStartDate).toISOString(),
        end_date: new Date(editedEndDate).toISOString(),
        event_type: editedEventType,
        price_in_pence: editedPriceInPence,
        location: editedLocation,
        image: editedImageUrl
      }

      await UpdateEvent(event_id, editedEvent);
      setShow(false);
      setIsUpdated(false)
    } catch (err) {
      setIsError(true)
      setError(err.response)
      console.log(error)
    }
  }

  return (
    <>
      <Button variant="primary" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md" onClick={() => setShow(true)}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={editedTitle || ""}
                aria-label="title"
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrganiser">
              <Form.Label>Organiser</Form.Label>
              <Form.Control
                value={event.organiser || ""}
                aria-label="organiser"
                disabled
                className='cursor-not-allowed'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as={"textarea"}
                value={editedDescription || ""}
                aria-label="description"
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type='datetime-local'
                value={formatDateForInput(editedStartDate) || ""}
                aria-label="start date"
                onChange={(e) => setEditedStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type='datetime-local'
                value={formatDateForInput(editedEndDate) || ""}
                aria-label="end date"
                onChange={(e) => setEditedEndDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventType">
              <Form.Label>Event Type</Form.Label>
              <Form.Control
                value={editedEventType || ""}
                aria-label="event type"
                onChange={(e) => setEditedEventType(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPriceInPence">
              <Form.Label>Price (£)</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                min='0'
                value={editedPriceInPence}
                aria-label="price"
                onChange={(e) => setEditedPriceInPence(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={editedLocation || ""}
                aria-label="location"
                onChange={(e) => setEditedLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                aria-label="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditedImageFile(file);
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editEvent(event)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

