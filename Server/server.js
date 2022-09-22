const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const adminRoutes = require('./controllers/src/admin-routes.js');
const doctorRoutes = require('./controllers/src/doctor-routes.js');
const patientRoutes = require('./controllers/src/patient-routes.js');
const insuranceRoutes = require('./controllers/src/insurance-routes.js');
const privateRoutes = require('./controllers/src/private-routes.js');

const auth = require('./controllers/Utils/login.js');

async function main() {

    app.use(cors())
    app.use(express.json())
    app.options('*', cors());  
    app.use(express.urlencoded ({
    extended: false
    }));
    app.use(cookieParser())

    app.get('/authentication',async (req, res) => {
        //how to access cookie in express
        
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]
        console.log("32 /authentication route accessToken",accessToken);
        if(accessToken == null) return res.sendStatus(401);
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                console.log("37 /authentication route err",err);
                return res.sendStatus(403);
            }else{
                console.log("40 /authentication route user",user);
                return res.json(user);
            }
        });
    });


    const authentication = async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        console.log("auth 43",token);
        if (token == null) {
            console.log("auth 45",token);
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log("entered jwt verify");
            if (err){
                console.log("auth 50",err);
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    }

    
    app.post('/login',async (req,res) => {

        const{login_role,choose_org,hospid,AdminID,Insurance_adminid,PID,DocID,adminid,emailId,password} = req.body
        let isLoggedIn=false;
        if(choose_org === 'hospital')
            switch (login_role){
                case 'admin':
                    const authentication_admin = auth.adminLogin(res,res,choose_org,hospid,AdminID,adminid,emailId,password);
                    isLoggedIn = authentication_admin;
                    break;

                case 'doctor':
                    const authentication_doctor = auth.doctorLogin(res,res,choose_org,hospid,AdminID,DocID,emailId,password);
                    isLoggedIn = authentication_doctor;
                    break;   

                case 'patient':
                    const authentication_patient = auth.patientLogin(res,res,choose_org,hospid,AdminID,PID,emailId,password);
                    isLoggedIn = authentication_patient;
                    break

        }else{
            //Insurance login
            const authentication_Insurance_admin = auth.InsuranceAdminLogin(req,res,choose_org,adminid,Insurance_adminid,emailId,password);
            isLoggedIn = authentication_Insurance_admin;
        }        
        return isLoggedIn;
    })

    //-------------------Admin Routes Starts---------------------
    
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

        if(deleteRecord === "deleteDoctor"){
            adminRoutes.deleteDoctor(req,res,org,hospid, AdminID);
        }else if(deleteRecord == "deletePatient"){
            adminRoutes.deletePatient(req,res,org,hospid, AdminID);
        }else{
            res.status(300).send("Wrong input");
        }
    })


    app.get('/admin/queries',authentication,(req,res) => {
        //how to get the return value from middleware
        console.log("req.user",req.user);
        
        console.log("choose_org",req.user.choose_org);
        console.log("hospid",req.user.hospid);
        console.log("AdminID",req.user.AdminID);
        const org = req.user.choose_org;
        const hospid = req.user.hospid;
        const AdminID = req.user.AdminID;
        // const org = req.body.org;
        // const hospid = req.body.hospid;
        // const AdminID = req.body.AdminID;
        const result = adminRoutes.Admin_query(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);
    })

    app.post('/admin/private_data', (req,res) =>{
        const result = privateRoutes.Private_Submit_transcations(req,res)
        console.log("Submitted result:",result);
    })

    //-------------------  Admin Routes Ends ----------------------
    //-------------------Doctors Routes Starts----------------------

    app.post('/doctor', (req,res) => {
        const org = req.body.org;
        const hospid = req.body.hospid;
        const DocID = req.body.DocID;
        const result = doctorRoutes.Doctor_submit_transcations(req,res,org,hospid,DocID);
        console.log("Submitted result:",result);
    })

    app.get('/doctor/queries',authentication,(req,res) => {
        console.log("req.user",req.user);
        
        console.log("choose_org",req.user.choose_org);
        console.log("hospid",req.user.hospid);
        console.log("AdminID",req.user.AdminID);
        const org = req.user.choose_org;
        const hospid = req.user.hospid;
        const AdminID = req.user.AdminID;

        // const org = req.body.org;
        // const hospid = req.body.hospid;
        // const AdminID = req.body.AdminID;
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

    app.get('/patient/queries',authentication,(req,res) =>{
        console.log("req.user",req.user);
        
        console.log("choose_org",req.user.choose_org);
        console.log("hospid",req.user.hospid);
        console.log("AdminID",req.user.AdminID);
        const org = req.user.choose_org;
        const hospid = req.user.hospid;
        const AdminID = req.user.AdminID;

        // const org = req.body.org;
        // const hospid = req.body.hospid;
        // const AdminID = req.body.AdminID;
        const result = patientRoutes.Patient_query(req,res,org,hospid,AdminID)
        console.log("Queried result:",result);
    })

    //-------------------Patients Routes Ends-----------------------
    //-------------------Insurance Starts Ends----------------------
    app.post('/Insurance',(req,res) => {
        
    })
    
    app.post('/Insurance/queries',(req,res) =>{
        const org = req.body.org;
        // const hospid = req.body.hospid;
        const AdminID = req.body.AdminID;
        const result = insuranceRoutes.Insurance_query(req,res,org,AdminID)
        console.log("Queried result:",result);

    })


    //-------------------Insurance Routes Ends----------------------

    app.listen(port, () => {
        console.log("Server is listening")
    })
}


main();
