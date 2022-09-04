import React from "react";

function Login() {
    const [Organization, setOrganization] = React.useState("");
    const [Role, setRole] = React.useState("");
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

                                <div className='field'>
                                    <div className='control is-expanded'>
                                        <div className='select is-fullwidth'>
                                            <select onChange={(event) => setOrganization(event.target.value)}>
                                                <option value='' disabled selected>Organization</option>
                                                <option value='Hospital'>Hospital</option>
                                                <option value='Insurance'>Insurance</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='field'>
                                    <div className='control is-expanded'>
                                        <div className='select is-fullwidth'>
                                            <select onChange={(event) => setRole(event.target.value)}>
                                                <option value='' disabled selected>Role</option>
                                                <option value='Admin'>Admin</option>
                                                <option value='Doctor'>Doctor</option>
                                                <option value='Patient'>Patient</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="buttons has-addons is-centered">
                                    <button className="button is-primary ">Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
