import React from "react";

function Login() {
    const [Role, setRole] = React.useState("");
    const [Organization, setOrganization] = React.useState("");
    const [HospName, setHospName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [ID,setID] = React.useState("");
    const [AdminID,setAdminID] = React.useState("");
    const [hospid,sethospid] = React.useState("");
    let adminid="",Insurance_adminid="";


    const handlingId = (e) => {
        console.log("29");
        if(Organization === "hospital"){
            console.log("true"+"33");
            if(Role === "admin"){
                if(HospName === "Apollo"){
                    console.log("true"+"36");
                    setAdminID("hosp1apolloadmin");
                    sethospid("1");
                    console.log("true"+"39");
                }else if(HospName === "Vijaya"){
                    setAdminID("hosp2vijayaadmin");
                    sethospid("2");
                }else if(HospName === "Stanley"){
                    setAdminID("hosp1apolloadmin");
                    sethospid("3");
                }
            }else if(Role === "doctor"){
                if(HospName === "Apollo"){
                    setAdminID("hosp1apolloadmin");
                    sethospid("1");
                }else if(HospName === "Vijaya"){
                    setAdminID("hosp2vijayaadmin");
                    sethospid("2");
                }else if(HospName === "Stanley"){
                    setAdminID("hosp1apolloadmin");
                    sethospid("3");
                }
            }else if(Role === "patient"){
                console.log("true"+"59");
                if(HospName === "Apollo"){
                    setAdminID("hosp1apolloadmin");
                    sethospid("1")
                }else if(HospName === "Vijaya"){
                    setAdminID("hosp2vijayaadmin");
                    sethospid("2");
                }else if(HospName === "Stanley"){
                    setAdminID("hosp1apolloadmin");
                    sethospid("3");
                }

            }
        }else if(Organization === "Insurance"){
            adminid = "";
        }
        console.log("67");
        console.log(hospid,AdminID,adminid);
    }

    const Submit_Login_Value = async()  => {
        console.log("Its works post route  ")
        handlingId(Role);
        console.log(Role,Organization,hospid,AdminID,Email,Password,ID,ID,ID);
        const fetchs = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login_role: Role,
                choose_org: Organization,
                hospid : hospid,
                AdminID : AdminID,
                emailId: Email,
                password: Password,
                // adminid : ID,
                PID : ID,
                // DocID : ID
            }),
        })
        try{
            const data = await fetchs.json();
            console.log(data);
        }   
        catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <section className="hero is-fullheight is-danger">
                <div className="hero-body">
                    <div className='container'>
                        <div className='column is-half is-offset-3'>
                            <div className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. alex@example.com" onChange= {(event) => setEmail(event.target.value) } />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className="input" type="password" placeholder="********" onChange={(event) => setPassword(event.target.value)}/>
                                    </div>
                                </div>

                                <div className='field'>
                                    <div className='control is-expanded'>
                                        <div className='select is-fullwidth'>
                                            <select onChange={(event) =>{
                                                setOrganization(event.target.value)
                                                }}>
                                                <option value='' disabled selected>Organization</option>
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
                                            <select onChange={(event) => setHospName(event.target.value)}>
                                                <option value='' disabled selected>Hospital Name</option>
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
                                <div className='field'>
                                    <div className='control is-expanded'>
                                        <div className='select is-fullwidth'>
                                            <select onChange={(event) => {
                                                setRole(event.target.value)
                                            }}>
                                                <option value='default value' disabled selected>Role</option>
                                                <option value='admin'>Admin</option>
                                                <option value='doctor'>Doctor</option>
                                                <option value='patient'>Patient</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder={Role + "ID"} onChange= {(event) => setID(event.target.value) } />
                                    </div>
                                </div>

                                <div className="buttons has-addons is-centered">
                                    <button className="button is-primary" style={{width:"50%"}} onClick={Submit_Login_Value}>Sign in</button>
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
