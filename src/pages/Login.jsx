import NavigationBar from "../components/NavigationBar";
import { useState, useEffect, useContext } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const { setLoggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const updateLoginInfo = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
    setIsError(false);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const loginRequest = async (e) => {
    setIsLoggingIn(true);
    try {
      e.preventDefault();
      if (rememberMe) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
      const userDetailsFromApi = await loginUser(email, password);
      // setIsLoggingIn(false);
      setLoggedInUser(userDetailsFromApi);
      localStorage.setItem("loggedInUser", JSON.stringify(userDetailsFromApi));
      setError(null);
      navigate("/");
    } catch (err) {
      setIsLoggingIn(false);
      setError(err.response.data.msg);
      setIsError(true);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="flex justify-center items-center md:h-[calc(100vh-70px)] h-screen  bg-gray-900">
        <div className="w-full max-w-md md:bg-gray-800 rounded-lg md:shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
            Login
          </h2>

          <form className="space-y-6" onSubmit={(e) => loginRequest(e)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter your email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => updateLoginInfo(e)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter your password"
                autoComplete="off"
                required
                onChange={(e) => updateLoginInfo(e)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 bg-gray-700 rounded"
                  onChange={handleRememberMe}
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-500 hover:text-indigo-400"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="text-sm sm:text-base w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow transition font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoggingIn ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-t-indigo-600 rounded-full animate-spin"></span>
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {isError && (
            <div className="mt-4 text-center text-red-500 text-sm">{error}</div>
          )}

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-500 hover:text-indigo-400"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
