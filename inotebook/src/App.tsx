import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { About } from "./components/About";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/notes/AlertState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <div className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
