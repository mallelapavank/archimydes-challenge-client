import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <span className="font-weight-bold">Archimydes Challenge</span>
      </Navbar.Brand>
    </Navbar>
  );
}
