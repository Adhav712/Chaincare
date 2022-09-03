import React from "react";

function Login() {
    const [Organization,setOrganization] = React.useState("");
    const [Role,setRole] = React.useState("");
    return (
        <>
            <section class="hero is-fullheight is-danger">
                <div class="hero-body">
                    <div className='container'>
                        <div className='column is-half is-offset-3'>
                            <form class="box">
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" type="email" placeholder="e.g. alex@example.com" />
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control">
                                        <input class="input" type="password" placeholder="********" />
                                    </div>
                                </div>
                                <div className="is-flex is-justify-content-space-evenly">
                                    {/* <div class = "is-mobile is-flex is-flex-direction-row"> */}
                                        <div class="field">
                                            <div class="control">
                                                <select Name= "Organization" id="Organization"  className="dropdown button" onChange={(event) => setOrganization(event.target.value)} >
                                                    <option value="">Select Organization</option>
                                                    <option value="Hospital">Hospital</option>
                                                    <option value="Insurance">Insurance</option>
                                                </select>                                   
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control">
                                            <div class="control">
                                                <select className="dropdown button" onChange={(event) => setRole(event.target.value)} >
                                                    <option value="Admin">Select Role</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Doctor">Doctor</option>
                                                    <option value="Patient">Patient</option>
                                                </select>                                   
                                            </div>
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <button class="button is-primary">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
