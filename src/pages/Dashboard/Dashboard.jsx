
import React from "react";
import { useState } from "react";
import DashboardLayoutSlots from "./Layout";

export default function Dashboard() {


  const [label, nextvalueupdater] = useState(12);
  return (
    <div>
  
    <DashboardLayoutSlots />


    </div>
  );
}
