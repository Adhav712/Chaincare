import React,{useEffect} from "react";
import Auth from "../../Auth";


function UpdatePatients() {
    
    useEffect(async() => {
        Auth();
    }, []);

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
                                    <p className='card-header-title'>Update Patient Detials</p>
                                </div>
                                <div className='card-content'>
                                    <div className='field'>
                                        <label className='label' value="patientId">PatientID</label>
                                        <div className='control'>
                                            <input className='input' type='text' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>FirstName</label>
                                        <div className='control'>
                                            <input className='input' type='text' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>LastName</label>
                                        <div className='control'>
                                            <input className='input' type='text' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>Age</label>
                                        <div className='control'>
                                            <input className='input' type='age' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>PhoneNumber</label>
                                        <div className='control'>
                                            <input className='input' type='number' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>Emergency PhoneNumber</label>
                                        <div className='control'>
                                            <input className='input' type='number' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>Address</label>
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

export default UpdatePatients;