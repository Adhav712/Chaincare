const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
// const enrollAdmin = require('./controllers/enrollAdmin');
// const registerUser = require('./controllers/registerUser');
// const query = require('./controllers/query');
// const patientRoutes = require('./patient-routes');
// const doctorRoutes = require('./doctor-routes');
const adminRoutes = require('./controllers/src/admin-routes.js');
const doctorRoutes = require('./controllers/src/doctor-routes.js');
const patientRoutes = require('./controllers/src/patient-routes');
const insuranceRoutes = require('./controllers/src/insurance-routes');
//const wallet = require('./controllers/wallet');
//const network = require('./controllers/Utils/app.js');
//const crypto = require('crypto');
const auth = require('./controllers/Utils/login.js');

// app.use(app.json());
// app.use(app.urlencoded ({
// extended: false
// }));


async function main() {

    app.use(cors())
    app.use(express.json())
    app.options('*', cors());  
    app.use(express.urlencoded ({
    extended: false
    }));

    app.post('/login',async (req,res) => {

        const{login_role,choose_org,hospid,AdminID,PID,DocID,adminid,emailId,password} = req.body
        let isLoggedIn=false;
        if(choose_org === 'hospital')
            switch (login_role){
                case 'admin':
                    const authentication_admin = auth.adminLogin(res,res,hospid,AdminID,adminid,emailId,password);
                    isLoggedIn = authentication_admin;
            
                    break;
                case 'doctor':
                    const authentication_doctor = auth.doctorLogin(res,res,hospid,AdminID,DocID,emailId,password);
                    (isLoggedIn = authentication_doctor);
                    break;   
                case 'patient':
                    const authentication_patient = auth.patientLogin(res,res,hospid,AdminID,PID,emailId,password);
                    isLoggedIn = authentication_patient;
                    break
        }else{
            //Insurance login
        }
        
        return isLoggedIn;
    })

    //-------------------Admin Routes Starts---------------------
    //app.get()
    
    app.post('/admin/register', (req,res) => {
       
    const register = req.body.register;
    const org = req.body.org;
    const hospid = req.body.hospid;
    const AdminID = req.body.AdminID;
    
    console.log("Its works post route  ")
    console.log(register)
    console.log(hospid,AdminID);
    if(register === "doctor"){
         adminRoutes.createDoctor(req,res,org,hospid,AdminID)
        console.log("Doctor is Created")
     }else if(register === "patient"){
         adminRoutes.createPatient(req,res,org,hospid,AdminID)
        console.log("Patient is Created")
     }else{
        console.log("nothing is created")
    }
    });

    app.post('/admin',(req,res) =>{
        const deleteRecord = req.body.delete;
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;

        if(deleteRecord == "deleteDoctor"){
            adminRoutes.deleteDoctor(req,res,org,hospid, AdminID);
        }else if(deleteRecord == "deletePatient"){
            adminRoutes.deletePatient(req,res,org,hospid, AdminID);
        }else{
            res.status(300).send("Wrong input");
        }
    })


    app.post('/admin/queries', (req,res) => {
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = adminRoutes.Admin_query(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);
    })

    //-------------------  Admin Routes Ends ----------------------
    //-------------------Doctors Routes Starts----------------------

    app.post('/doctor', (req,res) => {
        const choose_fun = req.body.choose_fun;
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        
        if(choose_fun == "doctor_update_details"){
            doctorRoutes.doctor_update_details(req,res,org,hospid,AdminID);
        }else if(choose_fun == "doctor_update_patient_details"){
            doctorRoutes.doctor_update_patient_details(req,res,org,hospid,AdminID);
        }else{
            res.status(300).send("Function not triggered properley")
        }

    })

    app.post('/doctors/queries', (req,res) => {
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = doctorRoutes.Doctor_query(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);
    })

    //-------------------Doctors Routes Ends----------------------
    //-------------------Patients Routes Starts----------------------

    app.post('/patient',(req,res) =>{
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = patientRoutes.Patient_Submit_transcations(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);
    })

    app.post('/patient/queries',(req,res) =>{
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = patientRoutes.Patient_query(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);
    })

    //-------------------Patients Routes Ends-----------------------
    //-------------------Insurance Starts Ends----------------------
    app.post('/Insurance',(req,res) => {
        
    })
    
    app.post('/Insurance/queries',(req,res) =>{
        const org = req.body.org;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = insuranceRoutes.Insurance_query(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);

    })


    //-------------------Insurance Routes Ends----------------------

    app.listen(port, () => {
        console.log("Server is listening")
    })
}


main();
