import React from "react";

function CreateDoctor() {
    return (
        <section className='hero has-background-white-bis is-fullheight-with-navbar'>
        <div className='hero-body'>
            <div className='container'>
                <div className='columns'>
                    <div className='column is-half is-offset-3'>
                        <div className='card'>
                            <form>
                                <div className='card-header'>
                                    <p className='card-header-title'>Create Doctor</p>
                                </div>
                                <div className='card-content'>
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
                                        <label className='label'>EmailId</label>    
                                            <div class="control has-icons-left">
                                                <input type="email" placeholder="e.g Alex Smith" class="input" required />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                </span>
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
                                        <label className='label'>Fields</label>
                                        <div className='control'>
                                            <input className='input' type='number' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>PhoneNumber</label>
                                        <div className='control'>
                                            <input className='input' type='number' />
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <label className='label'>DoctorID</label>
                                        <div className='control'>
                                            <input className='input' type='text' />
                                        </div>
                                    </div>

                                    {/* <div className='field'>
                                    <label className='label'>Type</label>
                                    <div className='control is-expanded'>
                                        <div className='select is-fullwidth'>
                                            <select>
                                                <option>Disaster</option>
                                                <option>Contest</option>
                                                <option>Fundraising</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}

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

export default CreateDoctor;