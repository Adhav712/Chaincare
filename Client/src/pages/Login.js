import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const [Role, setRole] = React.useState("");
    const [Organization, setOrganization] = React.useState("");
    const [HospName, setHospName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [ID, setID] = React.useState("");
    let adminid = "";




    const Submit_Login_Value = async () => {
        let AdminID = "";
        let hospid = "";
        let Insurance_adminid = "";
        console.log("Its works post route  ")
        if (HospName === "Apollo") {
            AdminID = "hosp1apolloadmin";
            hospid = "1";
        } else if (HospName === "Vijaya") {
            AdminID = "hosp2vijayaadmin";
            hospid = "2";
        } else if (HospName === "Stanley") {
            AdminID = "hospital3stanleyadmin";
            hospid = "3";
        } else if (Organization === "Insurance") {
            Insurance_adminid = "hosp1apolloadmin";
        }


        console.log(Role, Organization, hospid, AdminID, Email, Password, ID, ID, ID);
        const fetchs = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login_role: Role,
                choose_org: Organization,
                hospid: hospid,
                AdminID: AdminID,
                emailId: Email,
                password: Password,
                adminid: ID,
                PID: ID,
                DocID: ID,
                Insurance_adminid: Insurance_adminid
            }),
        })
        try {
            const data = await fetchs.json();
            console.log(data);
            if (data.auth === 'authenticated') {
                console.log("true");
                console.log("ajsbdjvsajdbsdkbnsakdbkbadkjb",data.accessToken);
                //how to set headers
                // const myheaders = new Headers();
                // myheaders.append("Authorization", "Bearer " + data.accessToken);

                document.cookie = `accessToken=${data.accessToken}`;
                if (Organization === "Insurance") {
                    navigate(`/insurance`);
                }
                navigate(`/${Role}`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <section className="hero is-fullheight is-black">
                <div className="hero-body">
                    <div className='container'>
                        <div className='column is-half is-offset-3'>
                            <div className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. alex@example.com" onChange={(event) => setEmail(event.target.value)} />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <div className="">
                                            <input className="input" id="password-field" type="password" placeholder="********" onChange={(event) => setPassword(event.target.value)} />
                                            {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> */}
                                        </div>
                                    </div>
                                </div>

                                <div className='field'>
                                    <div className='control is-expanded'>
                                        <div className='select is-fullwidth'>
                                            <select value={Organization} onChange={(event) => {
                                                setOrganization(event.target.value)
                                            }}>
                                                <option value='' disabled>Organization</option>
                                                <option value='hospital'>Hospital</option>
                                                <option value='Insurance'>Insurance</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {(Organization === 'hospital') ?
                                    (
                                        <div className='field'>
                                            <div className='control is-expanded'>
                                                <div className='select is-fullwidth'>
                                                    <select value={HospName} onChange={(event) => setHospName(event.target.value)}>
                                                        <option value='' disabled >Hospital Name</option>
                                                        <option value='Apollo' >Apollo Hospital</option>
                                                        <option value='Vijaya'>Vijaya Hospital</option>
                                                        <option value='Stanley'>Stanley Hospital</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                    ''
                                }

                                {(Organization === 'hospital') ?
                                    (
                                        <div className='field'>
                                            <div className='control is-expanded'>
                                                <div className='select is-fullwidth'>
                                                    <select value = {Role} onChange={(event) => {
                                                        setRole(event.target.value)
                                                    }}>
                                                        <option value='' disabled >Role</option>
                                                        <option value='admin'>Admin</option>
                                                        <option value='doctor'>Doctor</option>
                                                        <option value='patient'>Patient</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                    ''
                                }



                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder={Role + "ID"} onChange={(event) => setID(event.target.value)} />
                                    </div>
                                </div>

                                <div className="buttons has-addons is-centered">
                                    <button className="button is-primary" style={{ width: "50%" }} onClick={Submit_Login_Value}>Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Login;
