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
        const isLoggedIn=false;
        if(choose_org === 'hospital')
            switch (login_role){
                case 'admin':
                    auth.adminLogin(res,res,hospid,AdminID,adminid,emailId,password);
                    break;
                case 'doctor':
                        auth.doctorLogin(res,res,hospid,AdminID,DocID,emailId,password);
                    break;   
                case 'patient':
                      auth.patientLogin(res,res,hospid,AdminID,PID,emailId,password);
                    break
        }else{
            //Insurance login
        }
    })

    //-------------------Admin Routes Starts---------------------
    //app.get()
    
    app.post('/admin', (req,res) => {
       
    const register = req.body.register;
    const hospid = req.body.hospid;
    const AdminID = req.body.DocID_PID_AdminID;
    
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


    app.post('/admin/queries', (req,res) => {

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
