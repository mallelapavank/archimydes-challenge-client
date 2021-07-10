import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUser, updateUser } from "../../api";

export default function CreateOrEditUser({
  showModal,
  closeModal,
  user,
  updateUserList,
}) {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("User");
  const [validated, setValidated] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const user = { id, name, email, role };
    console.log("onSubmit", user);
    if (id) {
      updateUser(user).then(() => {
        updateUserList(user);
        onClose();
      });
    } else {
      createUser(user).then((user) => {
        updateUserList(user);
        onClose();
      });
    }
  };

  // reset state on closing modal
  const onClose = () => {
    setId("");
    setName("");
    setEmail("");
    setRole("User");
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${user?.id ? "Update" : "Create"} User`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={onSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>EMAIL</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>ROLE</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option>User</option>
              <option>Admin</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex flex-column">
            <Button variant="light" onClick={onClose} className="form-button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="form-button">
              {`${user?.id ? "Update" : "Create"} User`}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
