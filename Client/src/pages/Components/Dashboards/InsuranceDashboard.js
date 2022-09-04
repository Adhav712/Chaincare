import React from "react";

function InsuranceDashboard() {
    return(
        <section class="hero is-fullheight is-danger">
            <div class="hero-body">
                <div class="container">
                    <div className="column is-half is-offset-3">
                        <div className='mb-6'>
                            <p className='is-size-2'>Welcome, username</p>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <div class="card-content">
                                    <div className="columns" >
                                        <div className="column is-three-quarters">
                                            <input className="input is-success" type="text" placeholder="Patient ID"></input>
                                        </div>
                                        <div className="column">
                                            <button class="button is-info">Submit</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>    
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
                        {/* <div className="mb-6">
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
                                            <button class="button is-active is-fullwidth is-primary" value="Doctor_ReadPatients">Read Patients</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Doctor_queryPatientsByFirstName">Query by Firstname</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary" value="Doctor_queryPatientsByFirstName">Query by Lastname</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );

}

export default InsuranceDashboard;
