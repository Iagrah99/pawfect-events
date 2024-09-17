import { Spinner } from "react-bootstrap"

const Loading = ({ content }) => {
  return (
    <div className="flex justify-center items-center text-center min-h-96">
      <Spinner animation="border" role="status" />
      <span className="text-3xl lg:text-5xl ml-3">Loading {content}...</span>
    </div>
  )
}

export default Loading
