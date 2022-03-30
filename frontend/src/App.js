import React from "react";
import FormInsurance from "./Components/Insurance/FormInsurance";
import AdminAddDoctor from "./Components/Admin/AdminAddDoctor";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import AdminAddPatient from "./Components/Admin/AdminAddPatient"
import FormD from "./Components/Doctors/FormD";
import FormPatient from "./Components/Patient/FormPatient";
function App() {
  return (
    <div>
     <FormInsurance/>
     <AdminAddDoctor/>
     <AdminHomePage/>
     <AdminAddPatient/>
     <FormD/>
     <FormPatient/>
    </div>
  )
}

export default App;
