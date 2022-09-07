import React from "react";

function Login() {
    const [Role, setRole] = React.useState("");
    const [Organization, setOrganization] = React.useState("");
    const [HospName, setHospName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [ID,setID] = React.useState("");
    let AdminID,adminid,PID,DocID;

    

    const handlingAdminId = (HospName) => {
        if(HospName === "Apollo"){
            AdminID = "hosp1apolloadmin";
            

        }else if(HospName === "Vijaya"){
            AdminID = "hosp2vijayaadmin";
            hospid = "2";
        }else if(HospName === "Stanley"){
            AdminID = "hosp1apolloadmin";
            hospid = "3";
        }
    }


    const handlingId = (e) => {
        if(Organization === "hospital"){
            if(Role === "admin"){
                handlingAdminId(HospName,Role);                                
            }else if(Role === "doctor"){
                handlingAdminId(HospName,Role);
            }else if(Role === "patient"){
                handlingAdminId(HospName,Role);
            }
        }else if(Organization === "insurance"){
            adminid = "";
        }
    }

    let Submit_Login_Value = () => {
        


        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                choose_org: Organization,
                login_role: Role,
                emailId: Email,
                password: Password,
                hospid : '',
                AdminID : '',
                adminid : ID,


            }),
        })
        .then((response) => response.json())        
        .then((data) => {
            if (data.message === "Login Successful") {
                alert("Login Successful");
            }
            else {
                alert("Login Failed");
            }
        });
    }


    return (
        <>
            <section className="hero is-fullheight is-danger">
                <div className="hero-body">
                    <div className='container'>
                        <div className='column is-half is-offset-3'>
                            <form className="box">
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
                                                <option value='Hospital'>Hospital</option>
                                                <option value='Insurance'>Insurance</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                {(Organization === 'Hospital') ? 
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
                                                handlingId(event.target.value) 
                                            }}>
                                                <option value='default value' disabled selected>Role</option>
                                                <option value='Admin'>Admin</option>
                                                <option value='Doctor'>Doctor</option>
                                                <option value='Patient'>Patient</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="email" placeholder={Role + "ID"} onChange= {(event) => setID(event.target.value) } />
                                    </div>
                                </div>

                                <div className="buttons has-addons is-centered">
                                    <button className="button is-primary" style={{width:"50%"}} onClick={Submit_Login_Value}>Sign in</button>
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
