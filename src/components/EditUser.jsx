import { useState, useContext } from "react";
import { updateUser } from "../../utils/api";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const EditUser = ({ user, setIsUpdated, setError, setIsError }) => {
  const [show, setShow] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState("");
  const [isUsernameBlank, setIsUsernameBlank] = useState(false);

  const { setLoggedInUser } = useContext(UserContext);

  const handleClose = () => {
    setShow(false);
    // Revert back to original values
    setNewUsername(user.username);
    setNewPassword("");
    setIsUsernameBlank(false);
  };

  const editUser = async () => {
    try {
      const editedUser = {
        username: newUsername,
        password: newPassword,
      };
      const updatedUser = await updateUser(user.user_id, editedUser);
      setLoggedInUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setIsUpdated(true);

      setIsUpdated(true);
    } catch (err) {
      setIsError(true);
      setError(err.response);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-2 border-1 border-slate-800 lg:hover:border-slate-700 text-white bg-slate-900 px-2 py-2 rounded-md shadow-md text-sm lg:text-base"
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faPencil} className="text-orange-500" /> Edit
        Account
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-900 text-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 relative">
              <h2 className="text-xl font-semibold">Edit Account</h2>
              <button
                onClick={handleClose}
                className="text-white text-3xl absolute top-5 right-5"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block mb-1">New Username</label>
                <input
                  aria-label="username"
                  type="text"
                  value={newUsername || ""}
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                    const containsOnlySpaces = /^\s$/.test(e.target.value);
                    const isBlank = !e.target.value.trim();
                    containsOnlySpaces || isBlank
                      ? setIsUsernameBlank(true)
                      : setIsUsernameBlank(false);

                    const disableButton =
                      containsOnlySpaces || !e.target.value.trim();
                    document.querySelector("#save-changes").disabled =
                      disableButton;
                  }}
                  className="w-full p-2 bg-slate-700 border-slate-600 rounded-md text-white"
                />
              </div>

              {isUsernameBlank && (
                <p className="text-red-500 font-semibold text-sm">
                  Username cannot be left blank.
                </p>
              )}

              <div>
                <label className="block mb-1">New Password</label>
                <input
                  aria-label="password"
                  type="password"
                  value={newPassword || ""}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 bg-slate-700 border-slate-600 rounded-md text-white"
                />
              </div>
            </div>

            <div className="flex justify-start gap-2 px-6 py-4 bg-slate-900 border-t border-slate-700">
              <button
                id="save-changes"
                onClick={() => editUser(user)}
                className="px-4 py-2 bg-orange-800 text-white rounded-md hover:bg-orange-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUser;
