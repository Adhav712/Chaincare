import React, { useEffect } from "react";
import { Link } from "react-router-dom";


function DoctorDashboard() {
    const [doctor_details, setDoctor_details] = React.useState([]);
  
    useEffect(() => {
      const fetch_doctor_details = async () => {
        //how to access cookie
        const cookie = document.cookie;
        const jwt = cookie.split("=")[1];
  
        console.log("accessToken", jwt);
  
        const fetchs = await fetch("http://localhost:3000/doctor/queries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
            query: "Doctor_readDoctor",
          },
        });
        try {
          //get data from the response and store in the usestate
  
          const data = await fetchs.json();
          console.log(data);
          const datas = JSON.parse(data);
          //console.log(datas);
          setDoctor_details(datas);
        } catch (error) {
          console.log(error);
        }
      };
      // getplayload();
      fetch_doctor_details();
    }, []);
    return(
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="container">
                    <div className="column is-half is-offset-3">
                        <div className='mb-6'>
                            <p className='is-size-2'>Welcome, Doctor</p>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Profile Details
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div className="is-flex is-flex-direction-column is-align-items-flex-start" >
                                        <p className="">firstName: {doctor_details.firstName}</p>
                                        <p>lastName: {}</p>
                                        <p>Age: {doctor_details.age}</p>
                                        <p>PhoneNumber: {doctor_details.phoneNumber}</p>
                                        <p>Address: {doctor_details.address}</p>
                                        <p>Fields: {doctor_details.Fields}</p>
                                        <p>emailId: {doctor_details.emailId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <div class="card-content">
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <Link to="/doctor/updateDetails" className="button is-active is-primary is-fullwidth">Update Details</Link>
                                        </div>
                                        <div className="column">
                                            <Link to="/doctor/updatePatient_medicalDetails" className="button is-active is-primary is-fullwidth">UpdatePatientDetails</Link>
                                        </div>
                                    </div>
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <Link to="/doctor/viewPatient" className="button is-active is-primary is-fullwidth">View Patient</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default DoctorDashboard;