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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  React.useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  // hide the alerts after 3 seconds
  React.useEffect(() => {
    setTimeout(() => {
      updateSuccess && setUpdateSuccess(false);
      createSuccess && setCreateSuccess(false);
    }, 3000);
  }, [updateSuccess, createSuccess]);

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
      setCreateSuccess(true);
    } else {
      // found user - replace user object
      modifiedUserList[index] = modifiedUser;
      setUpdateSuccess(true);
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
      <Alert show={updateSuccess} variant={"success"}>
        User updated successfully
      </Alert>
      <Alert show={createSuccess} variant={"success"}>
        User created successfully
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
