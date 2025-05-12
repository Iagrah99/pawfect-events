import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { registerUser } from "../../utils/api";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOrganiser, setIsOrganiser] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(UserContext);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSetOrganiser = (e) => {
    setIsOrganiser(e.target.checked);
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setIsError(false);
    setError(null);

    try {
      const newUser = await registerUser({
        email,
        username,
        password,
        isOrganiser,
        avatarFile,
      });

      setLoggedInUser(newUser);
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      navigate(`/users/${newUser.user_id}`);
    } catch (err) {
      setIsError(true);
      setError(err.response?.data?.msg || "Something went wrong.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <NavigationBar />
      <main className="flex justify-center items-center flex-grow bg-slate-900">
        <div className="w-full max-w-lg border-1 border-slate-800 md:bg-slate-900 rounded-lg lg:shadow p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
            Sign Up
          </h2>

          <form className="space-y-6" onSubmit={handleUserRegistration}>
            <p className="text-center text-gray-300 text-sm">
              Fields marked with <span className="text-orange-400">*</span> are
              required.
            </p>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email <span className="text-orange-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                autoComplete="off"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsError(false);
                }}
                className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                id="username"
                required
                autoComplete="off"
                placeholder="Enter your username"
                maxLength={15}
                minLength={3}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsError(false);
                }}
                className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password <span className="text-orange-400">*</span>
              </label>
              <input
                type="password"
                id="password"
                required
                autoComplete="off"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsError(false);
                }}
                className="mt-1 block w-full p-2 bg-slate-800 border-1 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Avatar (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                className="block w-56 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-base file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 file:cursor-pointer rounded-lg pointer-events-none file:pointer-events-auto"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatarFile(file);
                  setIsError(false);
                }}
              />
            </div>

            <div className="flex items-center">
              <input
                id="is_organiser"
                name="is_organiser"
                type="checkbox"
                checked={isOrganiser}
                onChange={handleSetOrganiser}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-500 bg-slate-700 rounded cursor-pointer"
              />
              <label
                htmlFor="is_organiser"
                className="ml-2 block text-sm text-gray-300"
              >
                Select for Event Organiser role
              </label>
            </div>

            <button
              type="submit"
              className="text-sm sm:text-base w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-1 border-orange-600 bg-orange-800 text-white font-medium shadow transition
              hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-slate-900 focus:border-orange-100"
            >
              {isRegistering ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-t-orange-800 rounded-full animate-spin"></span>
                  Registering Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {isError && (
            <div className="mt-4 text-center text-red-500 text-sm">{error}</div>
          )}

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:text-orange-400"
            >
              Login
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
