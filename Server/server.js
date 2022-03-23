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

    app.post('/login',(req,res)=>{

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
                    isLoggedIn = authentication_doctor
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
    const hospid = req.body.hospid;
    const AdminID = req.body.AdminID;
    
    console.log("Its works post route  ")
    console.log(register)
    console.log(hospid,AdminID);
    if(register === "doctor"){
         adminRoutes.createDoctor(req,res,hospid,AdminID)
        console.log("Doctor is Created")
     }else if(register === "patient"){
         adminRoutes.createPatient(req,res,hospid,AdminID)
        console.log("Patient is Created")
     }else{
        console.log("nothing is created")
    }
    });

    app.post('/admin',(res,rep) =>{
        const deleteRecord = req.body.delete;
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;

        if(deleteRecord == "deleteDoctor"){
            adminRoutes.deleteDoctor(res,rep ,hospid, AdminID);
        }else if(deleteRecord == "deletePatient"){
            adminRoutes.deletePatient(res,rep ,hospid, AdminID);
        }else{
            res.status(300).send("Wrong input");
        }
    })


    app.post('/admin/queries', (req,res) => {
        const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = adminRoutes.Admin_query(req,res,hospid,AdminID)
        console.log("Queried result:",result);
    })

    //-------------------  Admin Routes Ends ----------------------
    //-------------------Doctors Routes Starts----------------------

    app.post('/doctor', (req,res) => {
        
    })

    app.post('/doctors/queries', (req,res) => {
  
    })

    //-------------------Doctors Routes Ends----------------------
    //-------------------Patients Routes Starts----------------------

    app.post('/doctor',(req,res) =>{

    })

    app.post('/doctor/queries',(req,res) =>{
        
    })

    //-------------------Patients Routes Ends----------------------

    app.listen(port, () => {
        console.log("Server is listening")
    })
}


main();
