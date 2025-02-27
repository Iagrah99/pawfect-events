import { Spinner } from "react-bootstrap"

const PostingEvent = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-96">
      <span className="text-3xl lg:text-5xl mb-3">Posting Event...</span>
      <Spinner animation="border" role="status" />
    </div>
  )
}

export default PostingEvent
