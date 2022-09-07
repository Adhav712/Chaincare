import React from "react";
import { Link } from "react-router-dom";

function PatientDashboard() {
    return(
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="container">
                    <div className="column is-half is-offset-3">
                        <div className='mb-6'>
                            <p className='is-size-2'>Welcome, Patient</p>
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
                                        <p className="">firstName</p>
                                        <p>lastName</p>
                                        <p>Age</p>
                                        <p>phoneNumber</p>
                                        <p>emergPhoneNumber</p>
                                        <p>address</p>
                                        <p>emailId</p>
                                        <p>permissionGranted[]</p>
                                        <p>changedBy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Medical Details
                                    </p>
                                </header>
                                <div class="card-content">
                                <div className="is-flex is-flex-direction-column is-align-items-flex-start" >
                                        <p className="">bloodGroup</p>
                                        <p>allergies</p>
                                        <p>symptoms</p>
                                        <p>diagnosis</p>
                                        <p>treatment</p>
                                        <p>followUp</p>                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <div class="card-content">
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <Link to="/patient/updateDetails" className="button is-active is-primary is-fullwidth">Update Details</Link>
                                        </div>
                                        <div className="column">
                                            <Link to="/patient/updatePassword" className="button is-active is-primary is-fullwidth">UpdatePassword</Link>
                                        </div>
                                    </div>
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <Link to="/patient/grantAccessToDoctor" className="button is-active is-primary is-fullwidth">Grant access to Doctor</Link>
                                        </div>
                                        <div className="column">
                                            <Link to="/patient/revokeAccessToDoctor" className="button is-active is-primary is-fullwidth">Revoke access from Doctor</Link>
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