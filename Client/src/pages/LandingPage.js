import React from "react";
import {Link } from "react-router-dom";

export default function LandingPage() {
    return (

        <div>
            {/* Title with button to login */}
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="column is-half is-offset-3">
                            <div className="box">
                                <div className="field">
                                    <h1 className="title has-text-centered has-text-black">Welcome to the Blockchain Health Records System</h1>                                    
                                </div>
                                <div className="buttons has-addons is-centered mt-5">
                                    <Link to='/login' style={{width:'50%'}} >
                                        <button className="button is-primary"  style={{width:'100%'}}>Login</button>
                                    </Link>
                                </div>
                            </div>
                        </div>    
                    </div>    
                </div>    

            </div>


        </div>
    );
}