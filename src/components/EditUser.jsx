import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { updateUser } from '../../utils/api';
import { UserContext } from '../contexts/UserContext';

const EditUser = ({ user, setIsUpdated, setError, setIsError }) => {
  const [show, setShow] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState("")
  const [isUsernameBlank, setIsUsernameBlank] = useState(false)

  const { setLoggedInUser } = useContext(UserContext)

  const handleClose = () => {
    setShow(false);
    // Revert back to original values
    setNewUsername(user.username);
    setNewPassword("")
    setIsUsernameBlank(false)
  };

  const editUser = async () => {
    try {
      const editedUser = {
        username: newUsername,
        password: newPassword
      };
      const updatedUser = await updateUser(user.user_id, editedUser);
      setLoggedInUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser))
      setIsUpdated(true)

      setIsUpdated(true);
    } catch (err) {
      setIsError(true);
      setError(err.response);
    }
  };

  return (
    <>
      <Button variant="primary" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md" onClick={() => setShow(true)}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                aria-label="username"
                value={newUsername || ""}
                onChange={(e) => {
                  setNewUsername(e.target.value)
                  const containsOnlySpaces = /^\s$/.test(e.target.value)
                  const isBlank = !e.target.value.trim();
                  containsOnlySpaces || isBlank ? setIsUsernameBlank(true) : setIsUsernameBlank(false)

                  const disableButton = containsOnlySpaces || !e.target.value.trim();
                  document.querySelector("#save-changes").disabled = disableButton;
                }}


              />
            </Form.Group>

            {isUsernameBlank && (
              <p className="mt-3 text-red-500 font-semibold">
                Username cannot be left blank.
              </p>
            )}

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                aria-label="password"
                value={newPassword || ""}
                type='password'
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"
            onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"
            id='save-changes'
            onClick={() => editUser(user)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default EditUser
