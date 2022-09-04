import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import 'bulma/css/bulma.min.css';
import AdminDashboard from "./pages/Components/Dashboards/AdminDashboard";
import PatientDashboard from "./pages/Components/Dashboards/PatientDashboard";
import DoctorDashboard from "./pages/Components/Dashboards/DoctorDashboard";
import InsuranceDashboard from "./pages/Components/Dashboards/InsuranceDashboard";

function App(){
  
  const [block, setblock] = useState("");

  const renderblock = () => {
    console.log("worked");
    setblock("Vanakada mapla motherboard la irudhu!!!!");
  }

  return (
    <div className="App">

      {/* <Login/> */}
      {/* <AdminDashboard/> */}
      {/* <PatientDashboard/> */}
      {/* <DoctorDashboard/> */}
      <InsuranceDashboard/>

    </div>
  );
}

export default App;
