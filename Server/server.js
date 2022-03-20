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

    app.post('/login',(req,res)=>{

        const{login_role,choose_org,hospid,DocID_PID_AdminID,emailId,password} = req.body
        if(choose_org === 'hospital')
            switch (login_role){
                case 'admin':
                    auth.adminLogin(hospid,password,DocID_PID_AdminID,emailId);
                    if(isLoggedIn == true){
                        res.status(200).send("authenticated");
                    }else{
                        res.status(500).send("Check your credentials or Internal server error")
                    }
                    break;
                case 'doctor':
                        auth.doctorLogin(hospid,password,DocID_PID_AdminID,emailId);
                        if(isLoggedIn == true){
                            res.status(200).send("authenticated");
                        }else{
                            res.status(500).send("Check your credentials or Internal server error")
                        }
                    break;   
                case 'patient':
                        auth.patientLogin(hospid,password,DocID_PID_AdminID,emailId);
                        if(isLoggedIn == true){
                            res.status(200).send("authenticated");
                        }else{
                            res.status(500).send("Check your credentials or Internal server error")
                        }
                    break
        }else{
            //Insurance login
        }
    })

    //-------------------Admin Routes Starts---------------------
    //app.get()
    
    app.post('/admin', (req,res) => {
        const register = req.body.register;
        const {hospid} = req.body;
        const DocID_PID_AdminID = req.body;
        console.log("Its works post route  ")
        console.log(register)

        if(register === "doctor"){
            adminRoutes.createDoctor(hospid,DocID_PID_AdminID)
            console.log("Doctor is Created")
        }else if(register === "patient"){
            adminRoutes.createPatient(hospid,DocID_PID_AdminID)
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
