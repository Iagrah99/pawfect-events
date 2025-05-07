import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Error = ({ error }) => {
  const navigate = useNavigate();

  const defaultError = {
    status: 404,
    data: {
      msg: "The content you were looking for doesn't exist."
    }
  };

  const currentError = error || defaultError;

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-66px)] bg-slate-900 text-white">
        <div className="bg-gray-800 p-6 space-x-4 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-300">Error {currentError.status}</h1>
          <p className="text-lg mb-4 text-gray-300">{currentError.data.msg}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ml-2">Go Back</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out shadow-md"
          >
            <FontAwesomeIcon icon={faHomeAlt} />
            <span className="ml-2">Back To Home</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
