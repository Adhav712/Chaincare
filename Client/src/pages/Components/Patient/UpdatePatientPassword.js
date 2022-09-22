import React,{useEffect} from "react";
import Auth from "../../Auth";

function UpdatePatientPassword() {
    useEffect(async() => {
        Auth();
    }, []);
    return(
        <section className='hero has-background-white-bis is-fullheight-with-navbar'>
        <div className='hero-body is-flex is-align-items-flex-start mt-6'>
            <div className='container'>
                <div className='columns'>
                    <div className='column is-half is-offset-3'>                        
                        <div className='card'>
                            <form>
                                <div className='card-header'>
                                    <p className='card-header-title'>Update Patient password</p>
                                </div>
                                <div className='card-content'>
                                    <div className='field'>
                                        <label className='label'>PatientID</label>
                                        <div className='control'>
                                            <input className='input' type='text' disabled placeholder="Default PatientID" />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>Password</label>
                                        <p class="control has-icons-left">
                                            <input class="input" type="password" placeholder="Temp Password" />
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-lock"></i>
                                            </span>
                                        </p>
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

export default UpdatePatientPassword;