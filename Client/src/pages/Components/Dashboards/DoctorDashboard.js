import React from "react";

function DoctorDashboard() {
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
                                        <p className="">firstName</p>
                                        <p>lastName</p>
                                        <p>Age</p>
                                        <p>phoneNumber</p>
                                        <p>Fields</p>
                                        <p>address</p>
                                        <p>emailId</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <div class="card-content">
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="doctor_update_details">UpdateDetails</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Doctor_updatePatientDetails">UpdatePatientDetails</button>
                                        </div>
                                    </div>
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Doctor_ReadPatients">ViewPatient</button>
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