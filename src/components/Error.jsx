import NavigationBar from "./NavigationBar"
import { useNavigate } from "react-router-dom";

const Error = ({ error }) => {

  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)] bg-gray-900 text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-300">Error {error.status}</h1>
          <p className="text-lg mb-4 text-gray-300">{error.data.msg}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  )
}

export default Error;
