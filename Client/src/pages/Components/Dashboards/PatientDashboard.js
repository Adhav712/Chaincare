import React from "react";

function PatientDashboard() {
    return(
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="container">
                    <div className="column is-half is-offset-3">
                        <div className='mb-6'>
                            <p className='is-size-2'>Welcome, username</p>
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
                                            <button class="button is-active is-fullwidth is-primary" value="Patient_updatePatient">UpdateDetails</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Patient_updatePatientPassword" >UpdatePassword</button>
                                        </div>
                                    </div>
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Patient_grantAccessToDoctor">Grant access to Doctor</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Patient_revokeAccessFromDoctor" >Revoke access from Doctor</button>
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