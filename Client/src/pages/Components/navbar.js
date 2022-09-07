import React from "react";
import chaincare_logo from "../../assets/logo.png";
import {Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav class="navbar is-transparent">
                <div class="navbar-brand">
                    <Link to="/" class="navbar-item">
                        <a class="navbar-item">
                            <img src={chaincare_logo} alt="Bulma: a modern CSS framework based on Flexbox" style={{marginTop:"6px"}}/>
                        </a>
                    </Link>   
                    {/* <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> */}
                </div>

                <div id="navbarExampleTransparentExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item" href="https://bulma.io/">
                            Dashboard
                        </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
                                Docs
                            </a>
                            <div class="navbar-dropdown is-boxed">
                                <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
                                    Overview
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">
                                    Modifiers
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                                    Columns
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                                    Layout
                                </a>
                                <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                                    Form
                                </a>
                                <hr class="navbar-divider" />
                                <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                                    Elements
                                </a>
                                <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                                    Components
                                </a>
                            </div>
                        </div>
                    </div>
                    

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="field is-grouped">
                                <p class="control">
                                    <a href ="https://github.com/Adhav712/Chaincare" target="_blank" rel="noopener noreferrer">
                                        <button class="button">
                                            <span class="icon">
                                                <i class="fab fa-github"></i>
                                            </span>
                                            <a>GitHub</a>
                                        </button>
                                    </a>
                                </p>
                                <p class="control">
                                    <Link to='/login' style={{width:'50%'}} >
                                        <button class="button is-success ">
                                            Log out
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;