import * as React from "react";
import { AlignHorizontalCenter } from "@mui/icons-material";
import "./Login.css";
import { Link } from "react-router-dom";
import { color } from "framer-motion";

export default function Login() {
  return (
    //this might be unnecessery or not working
    <div style={{msTouchAction:"pan-x pan-y"}}> 
      
    <div
    className="container"
    style={{
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      flexDirection:"column",
     
    }}
    >
      {/* temporary link */}
      <div style={{padding:"100px"}}> <h1> Go to <Link to ="/Todolist">To-Do List</Link></h1>
      <h1 style={{display:"flex",justifyContent:"center",}}>See <Link to ="/timetablefc">   Time-table</Link></h1></div> 
      <form className="box">
        <img
          src="./logo.png"
          height={175}
          style={{
            display: "block",
            margin: "auto",
            filter: "drop-shadow(0 0 5px rgba(102, 126, 234, 0.7))",
          }}
        />
        <div>
          <input
            type="text"
            placeholder="User name"
            required
            id="username"
            className="inputs"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            id="password"
            className="inputs"
          />
        </div>
        <button
          id="submit"
          onClick={() => {
            console.log("submit clicked!");
          }}
        >
          Log in
        </button>
      </form>
      <h3 style={{color:"red",}}> Login functionality is still under construction! <br /> please proceed to <Link to="/Todolist">To-Do List</Link></h3>
    </div>
    </div>
  );
}
