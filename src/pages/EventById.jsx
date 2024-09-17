import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../../utils/api"
import EventPost from "../components/EventPost";
import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";

const ViewEvent = () => {

  const { event_id } = useParams();

  const [event, setEvent] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const eventFromApi = await fetchEventById(event_id);
      setEvent(eventFromApi)
      setIsLoading(false)
    }
    fetchData();

  }, [])

  return (
    <>
      <NavigationBar />
      {isLoading ? (<Loading content="Event Details" />) : (<EventPost event={event} />)}
    </>
  )
}

export default ViewEvent
