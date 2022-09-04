import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import 'bulma/css/bulma.min.css';
import AdminDashboard from "./pages/Components/Dashboards/AdminDashboard";
import PatientDashboard from "./pages/Components/Dashboards/PatientDashboard";
import DoctorDashboard from "./pages/Components/Dashboards/DoctorDashboard";
import InsuranceDashboard from "./pages/Components/Dashboards/InsuranceDashboard";
import CreatePatient from "./pages/Components/CreatePatient";
import CreateDoctor from "./pages/Components/CreateDoctor";
import Navbar from "./pages/Components/navbar";
import ViewPatient from "./pages/Components/ViewPatient";
import ViewDoctor from "./pages/Components/ViewDoctor";


function App(){

  return (
    <div className="App">

      <Navbar/>
      {/* <Login/>
      <AdminDashboard/>
      <PatientDashboard/>
      <DoctorDashboard/>
      <InsuranceDashboard/>
      <CreatePatient/>
      <CreateDoctor/>   
      <ViewPatient/> */}
      <ViewDoctor/>

    </div>
  );
}

export default App;
