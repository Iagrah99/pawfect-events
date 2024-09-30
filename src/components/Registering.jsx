import { Spinner } from "react-bootstrap"

const Registering = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center text-center min-h-96">
      <span className="text-3xl lg:text-5xl mb-3 lg:mb-0 lg:mr-3">Registering Account...</span>
      <Spinner animation="border" role="status" />
    </div>
  )
}

export default Registering
