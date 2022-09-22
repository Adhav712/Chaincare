import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth";

function PatientDashboard() {
  const [patient_details, setPatient_details] = React.useState([]);

  useEffect(() => {
    Auth();
    
    const fetch_patient_details = async () => {
      //how to access cookie
      const cookie = document.cookie;
      const jwt = cookie.split("=")[1];

      console.log("accessToken", jwt);

      const fetchs = await fetch("http://localhost:3000/patient/queries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          query: "Patient_readPatient",
        },
      });
      try {
        //get data from the response and store in the usestate

        const data = await fetchs.json();
        console.log(data);
        const datas = JSON.parse(data);
        //console.log(datas);
        setPatient_details(datas);
      } catch (error) {
        console.log(error);
      }
    };
    // getplayload();
    fetch_patient_details();
  }, []);

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="column is-half is-offset-3">
            <div className="mb-6">
              <p className="is-size-2">Welcome, Patient</p>
            </div>
            <div className="mb-6">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">Profile Details</p>
                </header>
                <div className="card-content">
                  <div className="is-flex is-flex-direction-column is-align-items-flex-start">
                    <p className="">firstName: {patient_details.firstName}</p>
                    <p>lastName: {patient_details.lastName}</p>
                    <p>Age: {patient_details.age}</p>
                    <p>PhoneNumber: {patient_details.phoneNumber}</p>
                    <p>EmergPhoneNumber: {patient_details.emergPhoneNumber}</p>
                    <p>Address: {patient_details.address}</p>
                    <p>EmailID: {patient_details.emailId}</p>
                    <p>
                      PermissionGranted: {patient_details.permissionGranted}
                    </p>
                    <p>ChangedBy: {patient_details.ChangedBy}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">Medical Details</p>
                </header>
                <div className="card-content">
                  <div className="is-flex is-flex-direction-column is-align-items-flex-start">
                    <p className="">bloodGroup: {patient_details.bloodGroup}</p>
                    <p>allergies: {patient_details.allergies}</p>
                    <p>symptoms: {patient_details.symptoms} </p>
                    <p>diagnosis: {patient_details.diagnosis}</p>
                    <p>treatment: {patient_details.treatment}</p>
                    <p>followUp: {patient_details.followUp}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="card">
                <div className="card-content">
                  <div className="columns is-half">
                    <div className="column">
                      <Link
                        to="/patient/updateDetails"
                        className="button is-active is-primary is-fullwidth"
                      >
                        Update Details
                      </Link>
                    </div>
                    <div className="column">
                      <Link
                        to="/patient/updatePassword"
                        className="button is-active is-primary is-fullwidth"
                      >
                        UpdatePassword
                      </Link>
                    </div>
                  </div>
                  <div className="columns is-half">
                    <div className="column">
                      <Link
                        to="/patient/grantAccessToDoctor"
                        className="button is-active is-primary is-fullwidth"
                      >
                        Grant access to Doctor
                      </Link>
                    </div>
                    <div className="column">
                      <Link
                        to="/patient/revokeAccessToDoctor"
                        className="button is-active is-primary is-fullwidth"
                      >
                        Revoke access from Doctor
                      </Link>
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

export default PatientDashboard;
