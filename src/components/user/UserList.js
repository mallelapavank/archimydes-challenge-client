import React from "react";
import { deleteUser } from "../../api";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

export default function UserList({ users, showUser, deleteUserFromList }) {
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  const [deleteFailed, setDeleteFailed] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      deleteSuccess && setDeleteSuccess(false);
      deleteFailed && setDeleteFailed(false);
    }, 3000);
  }, [deleteSuccess, deleteFailed]);

  const onDeleteClick = (event, userId) => {
    // stop propogation to prevent click event bubbling
    if (event.stopPropagation) event.stopPropagation();

    if (window.confirm("Are you sure you want to delete?")) {
      deleteUser(userId)
        .then(() => {
          setDeleteSuccess(true);
          deleteUserFromList(userId);
        })
        .catch((error) => {
          setDeleteFailed(true);
        });
    }
  };

  return (
    <>
      <Alert show={deleteSuccess} variant={"success"}>
        User deleted successfully
      </Alert>
      <Alert show={deleteFailed} variant={"danger"}>
        Sorry, could not delete user
      </Alert>
      <Table responsive className="table-container">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ROLE</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No Users
              </td>
            </tr>
          )}
          {users?.map((user) => {
            return (
              <tr key={user.id} onClick={() => showUser(user)}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <img
                    src={require("../../assets/images/delete-icon.svg").default}
                    alt="delete-icon"
                    className="delete-icon"
                    onClick={(e) => onDeleteClick(e, user.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
