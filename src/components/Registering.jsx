import { Spinner } from "react-bootstrap"

const Registering = () => {
  return (
    <div className="flex justify-center items-center text-center min-h-96">
      <Spinner animation="border" role="status" />
      <span className="text-3xl lg:text-5xl ml-3">Registering Account...</span>
    </div>
  )
}

export default Registering
