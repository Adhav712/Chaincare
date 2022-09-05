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
import UpdatePatients from "./pages/Components/Patient/UpdatePatient";
import UpdateDoctors from "./pages/Components/Doctor/UpdateDoctor";
import UpdatePatientPassword from "./pages/Components/Patient/UpdatePatientPassword";
import GrantAccessToDoctor from "./pages/Components/Patient/GrantAccessToDoctor";
import RevokeAccessToDoctor from "./pages/Components/Patient/RevokeAccessToDoctor";
import UpdatePatient_medic from "./pages/Components/Doctor/UpdatePatient_medic";
import DeletePatient from "./pages/Components/DeletePatient";
import DeleteDoctor from "./pages/Components/DeleteDoctor";

function App(){

  return (
    <div className="App">

      <Navbar/>
      <Login/>
      <AdminDashboard/>
      <PatientDashboard/>
      <DoctorDashboard/>
      <InsuranceDashboard/>
      <CreatePatient/>
      <CreateDoctor/>   
      <ViewPatient/>
      <ViewDoctor/>
      <UpdatePatients/>
      <UpdateDoctors/>
      <UpdatePatientPassword/>
      <GrantAccessToDoctor/>
      <RevokeAccessToDoctor/>
      <UpdatePatient_medic/>
      <DeletePatient/>
      <DeleteDoctor/>


    </div>
  );
}

export default App;
