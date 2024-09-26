import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Registering from "../components/Registering";
import NavigationBar from "../components/NavigationBar";
import { registerUser } from "../../utils/api";
import { UserContext } from "../contexts/UserContext";

const Register = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isOrganiser, setIsOrganiser] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const navigate = useNavigate()

  const { setLoggedInUser } = useContext(UserContext);


  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false)

  const handleImageUpload = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setAvatarUrl(data.data.url);
      } else {
        console.error('Image upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSetOrganiser = (e) => {
    setIsOrganiser(e.target.checked)
  }

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      setIsError(false)
      setError(null)
      const userData = {
        email,
        username,
        password,
        isOrganiser,
        avatarUrl
      }
      const newUser = await registerUser(userData)
      setIsRegistering(false)
      setLoggedInUser(newUser)
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      navigate(`/users/${newUser.user_id}`)
      console.log(newUser)

    } catch (err) {
      setIsRegistering(false);
      setIsError(true)
      setError(err.response.data.msg)
    }
  }

  return (
    <>
      <NavigationBar />
      {isRegistering ? <Registering /> : <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-gray-900">
        <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">Sign Up</h2>

          <form className="space-y-6" onSubmit={(e) => handleUserRegistration(e)}>
            <p className='text-center'>Input fields marked with an <span className="text-indigo-400">*</span> indicate a required field.</p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email <span className="text-indigo-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter your email"
                autoComplete="off"
                required
                onChange={(e) => { setEmail(e.target.value); setIsError(false) }}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username <span className="text-indigo-400">*</span>
              </label>
              <input
                type="username"
                id="username"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter your username"
                autoComplete="off"
                required
                onChange={(e) => { setUsername(e.target.value); setIsError(false) }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password <span className="text-indigo-400">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter your password"
                autoComplete="off"
                required
                onChange={(e) => { setPassword(e.target.value); setIsError(false) }}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1 text-gray-300">
                Avatar (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 hover:cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatarFile(file);
                  setIsError(false);
                  if (file) {
                    handleImageUpload(file);
                    console.log(avatarUrl)
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="is_organiser"
                  name="is_organiser"
                  type="checkbox"
                  checked={isOrganiser}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 bg-gray-700 rounded cursor-pointer"
                  onChange={handleSetOrganiser}
                />
                <label htmlFor="is_organiser" className="ml-2 block text-sm text-gray-300">
                  Select for Event Organiser role
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>

          {isError && (
            <div className="mt-4 text-center text-red-500 text-sm">
              {error}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-indigo-500 hover:text-indigo-400">
              Login
            </a>
          </p>
        </div>
      </div>}
    </>
  )
}

export default Register
