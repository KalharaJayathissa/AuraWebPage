import { Routes, Route, Link} from "react-router-dom";
import Login from "./pages/Login/Login";



export default function App() {
  return (
    <div>
      {/* <nav> //this paer can be used as a navigation bar which appears in all the pages
        <Link to="/">Login</Link> | {" "}
      </nav> */}

      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>

    </div>
  );
}