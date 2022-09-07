import React from "react";


function ViewPatient() {
    const [query, setquery] = React.useState("Patient-ID");

    const queryfucntion = (query) => {
        if (query === "Patient-ID") {
            document.getElementById("Patient-ID").className = "is-active";
            document.getElementById("Patientby-FirstName").className = "a";
            document.getElementById("Patientby-LastName").className = "a";
            setquery("Patient-ID");

        } else if (query === "Patientby-FirstName") {
            document.getElementById("Patient-ID").className = "a";
            document.getElementById("Patientby-FirstName").className = "is-active";
            document.getElementById("Patientby-LastName").className = "a";
            setquery("Patientby-FirstName");

        } else if (query === "Patientby-LastName") {
            document.getElementById("Patient-ID").className = "a";
            document.getElementById("Patientby-FirstName").className = "a";
            document.getElementById("Patientby-LastName").className = "is-active";
            setquery("Patientby-LastName");
        }
    }

    return (
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-start">
                <div class="mt-3 ml-3">
                    <div class="tabs is-boxed">
                        <ul>
                            <li class="is-active" id="Patient-ID">
                                <a onClick={() => { queryfucntion("Patient-ID") }}>
                                    <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
                                    <span>Patient-ID</span>
                                </a>
                            </li>
                            <li id="Patientby-FirstName">
                                <a onClick={() => { queryfucntion("Patientby-FirstName") }}>
                                    <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
                                    <span>Patientby-FirstName</span>
                                </a>
                            </li>
                            <li id="Patientby-LastName">
                                <a onClick={() => { queryfucntion("Patientby-LastName") }}>
                                    <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
                                    <span>Patientby-LastName</span>
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

export default ViewPatient;