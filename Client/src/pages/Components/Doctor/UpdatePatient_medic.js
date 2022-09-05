import React from "react";

function UpdatePatient_medic() {
    return (
        <section className='hero has-background-white-bis is-fullheight-with-navbar'>
            <div className='hero-body'>
                <div className='container'>
                    <div className='columns'>
                        <div className='column is-half is-offset-3'>
                            <p className="mb-6 is-size-4 has-text-centered">Show the predefined value to the side so that it will be easy for the user to revert new changes</p>
                            <div className='card'>
                                <form>
                                    <div className='card-header'>
                                        <p className='card-header-title'>Update Patient Medical Details</p>
                                    </div>
                                    <div className='card-content'>
                                        <div className='field'>
                                            <label className='label' value="DocID">DoctorID</label>
                                            <div className='control'>
                                                <input className='input' type='text' />
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label' value="PatientID">PatientID</label>
                                            <div className='control'>
                                                <input className='input' type='text' />
                                            </div>
                                        </div>


                                        <div className='field'>
                                            <label className='label'>Symptoms</label>
                                            <div className='control'>
                                                <input className='input' type='text' />
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>Diagnosis</label>
                                            <div className='control'>
                                                <input className='input' type='text' />
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>Treatment</label>
                                            <div className='control'>
                                                <input className='input' type='text' />
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>FollowUp</label>
                                            <div className='control'>
                                                <input className='input' type='text' />
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>Updated by</label>
                                            <div className='control'>
                                                <input className='input' type='text' disabled placeholder="Default PatientID" />
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <div className='control'>
                                                <input type='submit' value='Submit' className='button is-primary is-outlined is-fullwidth' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UpdatePatient_medic;