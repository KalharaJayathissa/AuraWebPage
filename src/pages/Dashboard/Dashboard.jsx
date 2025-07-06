//after setting this up, after login user will land in to this page
//from here he can navigate between to do list and resources page and
//other pages by clicking the left navigation panel.

//import Todolist from './Todolist/Todolist';
import React from "react";
import { useState } from "react";

export default function Dashboard() {

    function increment(val){
       return (val + 1);
    }

  const [label, nextvalueupdater] = useState(12);
  return (
    <div>
      <h1>show: {label}</h1>
      <button onClick={nextvalueupdater(() => increment(label))}> up </button>
    </div>
  );
}
