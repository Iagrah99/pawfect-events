import { Spinner } from "react-bootstrap"

const Registering = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-96">
      <span className="text-3xl lg:text-5xl mb-3">Registering Account...</span>
      <Spinner animation="border" role="status" />
    </div>
  )
}

export default Registering
