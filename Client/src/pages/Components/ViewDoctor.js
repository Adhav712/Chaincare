import React from "react";


function ViewDoctor() {
    const [query, setquery] = React.useState("Doctor-ID");

    const queryfucntion = (query) => {
        if (query == "Doctor-ID") {
            document.getElementById("Doctor-ID").className = "is-active";
            document.getElementById("Doctorby-FirstName").className = "a";
            document.getElementById("Doctorby-LastName").className = "a";
            setquery("Doctor-ID");

        } else if (query == "Doctorby-FirstName") {
            document.getElementById("Doctor-ID").className = "a";
            document.getElementById("Doctorby-FirstName").className = "is-active";
            document.getElementById("Doctorby-LastName").className = "a";
            setquery("Doctorby-FirstName");

        } else if (query == "Doctorby-LastName") {
            document.getElementById("Doctor-ID").className = "a";
            document.getElementById("Doctorby-FirstName").className = "a";
            document.getElementById("Doctorby-LastName").className = "is-active";
            setquery("Doctorby-LastName");
        }
    }

    return (
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-start">
                <div class="mt-3 ml-3">
                    <div class="tabs is-boxed">
                        <ul>
                            <li class="is-active" id="Doctor-ID">
                                <a onClick={() => { queryfucntion("Doctor-ID") }}>
                                    <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
                                    <span>Doctor-ID</span>
                                </a>
                            </li>
                            <li id="Doctorby-FirstName">
                                <a onClick={() => { queryfucntion("Doctorby-FirstName") }}>
                                    <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
                                    <span>Doctorby-FirstName</span>
                                </a>
                            </li>
                            <li id="Doctorby-LastName">
                                <a onClick={() => { queryfucntion("Doctorby-LastName") }}>
                                    <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
                                    <span>Doctorby-LastName</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-6">
                    <div class="card">
                        <div class="card-content">
                            <div className="columns is-align-items-flex-end" >
                                <div className="column is-four-fifths">
                                    <label class="label">Query by {query}</label>
                                    <input className="input is-success" type="text" placeholder={query}></input>
                                </div>
                                <div className="column">
                                    <button class="button is-info">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ViewDoctor;