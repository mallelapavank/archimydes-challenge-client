import React, { useState } from "react";
import { getUsers } from "../../api";
import Button from "react-bootstrap/esm/Button";
import CreateOrEditUser from "./CreateOrEditUser";
import UserList from "./UserList";
import Alert from "react-bootstrap/esm/Alert";

export default function UserSection() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [existingUser, setExistingUser] = useState();
  const [error, setError] = useState("");

  React.useEffect(() => {
    getUsers()
      .then((users) => setUsers(users))
      .catch((error) => setError("Sorry, could not get users"));
  }, []);

  console.log("users", users);
  console.log("message", error);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const showUser = (user) => {
    setExistingUser(user);
    handleShowModal();
  };

  const closeModal = () => {
    setExistingUser(null);
    handleCloseModal();
  };

  const updateUserList = (modifiedUser) => {
    const index = users.findIndex((user) => user.id === modifiedUser.id);
    const modifiedUserList = [...users];
    if (index === -1) {
      // user does not exist - push user object
      modifiedUserList.push(modifiedUser);
    } else {
      // found user - replace user object
      modifiedUserList[index] = modifiedUser;
    }
    setUsers(modifiedUserList);
  };

  const deleteUserFromList = (userId) => {
    const modifiedUserList = users.filter((user) => user.id !== userId);
    setUsers(modifiedUserList);
  };

  return (
    <div className="body-container container">
      <div className="page-title">
        <h4>Users</h4>
        <Button onClick={handleShowModal}>+ Create User</Button>
      </div>
      <Alert show={error} variant={"danger"}>
        {error}
      </Alert>
      <CreateOrEditUser
        showModal={showModal}
        closeModal={closeModal}
        user={existingUser}
        updateUserList={updateUserList}
      />
      <UserList
        users={users}
        showUser={showUser}
        deleteUserFromList={deleteUserFromList}
      />
    </div>
  );
}
