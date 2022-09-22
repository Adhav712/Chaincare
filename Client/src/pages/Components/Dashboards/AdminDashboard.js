import React,{useEffect} from "react";
import Auth from "../../Auth";
import { Link } from "react-router-dom";

function AdminDashboard() {
    useEffect(async() => {
        Auth();
    }, []);
    return (
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="container">
                    <div className="column is-half is-offset-3">
                        <div className='mb-6'>
                            <p className='is-size-2'>Welcome, Admin</p>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Doctor
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <Link to="/admin/createDoctor" className="button is-active is-primary is-fullwidth">Create Doctor</Link>
                                        </div>
                                        <div className="column">
                                            <Link to="/admin/viewDoctor" className="button is-active is-primary is-fullwidth">View Doctor</Link>
                                        </div>
                                        <div className="column">
                                            <Link to='/admin/deleteDoctor'>
                                                <button class="button is-active is-fullwidth is-danger is-outlined">Delete Doctor</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Patient
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <Link to="/admin/createPatient" className="button is-active is-primary is-fullwidth">Create Patient</Link>
                                            
                                        </div>
                                        <div className="column">
                                            <Link to="/admin/viewPatient" className="button is-active is-primary is-fullwidth">View Patient</Link>
                                            
                                        </div>
                                        <div className="column">
                                            <Link to='/admin/deletePatient'>
                                                <button class="button is-active is-fullwidth is-danger is-outlined">Delete Patient</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><div className="mb-6">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Private queries in Progress
                                    </p>
                                </header>
                                {/* <div class="card-content">
                                    <div className="columns is-half" >
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary">Create Patient</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-primary">View Patient</button>
                                        </div>
                                        <div className="column">
                                            <button class="button is-active is-fullwidth is-danger is-outlined">Delete Patient</button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default AdminDashboard;