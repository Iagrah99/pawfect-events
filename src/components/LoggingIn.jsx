import { Spinner } from "react-bootstrap"

const LoggingIn = () => {
  return (
    <div className="flex justify-center items-center text-center min-h-96">
      <Spinner animation="border" role="status" />
      <span className="text-3xl lg:text-5xl ml-3">Logging In...</span>
    </div>
  )
}

export default LoggingIn
