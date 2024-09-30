import { Spinner } from "react-bootstrap"

const LoggingIn = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-96">
      <span className="text-3xl lg:text-5xl mb-3">Logging In...</span>
      <Spinner animation="border" role="status" />
    </div>
  )
}

export default LoggingIn
