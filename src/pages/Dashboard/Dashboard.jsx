
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
      <button onClick={() => nextvalueupdater(increment(label))}> up </button>
    </div>
  );
}
