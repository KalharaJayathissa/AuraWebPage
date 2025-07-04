import { Routes, Route, Link} from "react-router-dom";
import Login from "./pages/Login/Login";
import Todolist from "./pages/Todolist/Todolist";


export default function App() {
  return (
     <div>
      <nav> temporary nav bar : 
        <Link to="/">Login</Link> | {" "}
        <Link to="/Todolist">To do list</Link>
      </nav> 

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Todolist" element={<Todolist />}></Route>
      </Routes>

    </div>
  );
}