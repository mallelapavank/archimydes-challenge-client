import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import UserSection from "./components/user";

function App() {
  return (
    <div className="app">
      <Header />
      <UserSection />
    </div>
  );
}

export default App;
