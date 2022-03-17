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
const wallet = require('./controllers/wallet');
const network = require('./controllers/Utils/app.js');
const crypto = require('crypto');
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

    //-------------------Admin Routes---------------------
    app.post('/admin/register', (req,res) => {
        const {register} = req.body;
        console.log("Its works post route  ")
        console.log(register)

        if(register === "doctor"){
            adminRoutes.createDoctor
            console.log("Doctor is Created")
        }else if(register === "patient"){
            adminRoutes.createPatient
            console.log("Patient is Created")
        }else{
            console.log("nothing is created")
        }
    });

    app.post('/admin/register', (req,res) => {
        console.log("Its works get route ")
    })

    app.post('/admin/queries', (req,res) => {
        
    })

    //-------------------Admin Routes----------------------

    //-------------------Doctors Routes----------------------


    //-------------------Doctors Routes----------------------

    //-------------------Patients Routes----------------------


    //-------------------Patients Routes----------------------
    // app.get('/query',(req,res)=>{
    //     enrollAdmin.main
    //     registerUser.main
    //     query.query
        
    // });
        
        
        
        // query.query() 
        // res.setHeader('Content-Type','application/json');
        // res.send(JSON.stringify(query.query.result));
        // query.query();
        // const response = query.query();
        // res.status(200).send(JSON.parse(response))
        // const result = JSON.parse(response); 
        // res.json(`hello:${result}`)
        // res.end('<h1>Hello</h1>');
   

    app.listen(port, () => {
        console.log("Server is listening")
    })
}

// app.get('/', (req,res) => { enrollAdmin.main()})

// app.get('/register', (req,res) => {registerUser.main()})

// app.get('/query', (req,res) => { query.main()})

main();

// app.get('/',(req,res) => {
//     res.send('hey');
// })


;


// const { json } = require('express');
// const http = require('http');

// const server = http.createServer((req,res) => {
//     const user = {
//             Name : "Adhavan",
//             Age : "20"
//         } 
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(user))
    
// })
// server.listen(3000);

// const express = require("express");
// const app = express();
// const port = 3000;
// const user = {
//    Name : "Adhavan",
//    Age : "20"
// }

// app.post('/',(rep,res) => {
//    res.setHeader('Content-Type','application/json');
//    res.end(JSON.stringify(user))
// })

// app.listen(port, console.log(`Your server listening on localhost ${port}`));
// app.listen(port, () => { 
//    console.log(`Your server listening on localhost ${port}`)
// });


// const express = require("express");
// const app = express()
// const port = 3000;
// const user = {
//     name: "adhavan",
//     age:20
// }
// const user1 = {
//     name: "adhavan",
//     age:21
// }
// //get
// app.get('/', (req,res)=> {
//     // res.setHeader("Content-Type","application/json");
//     // res.end(JSON.stringify(user))
//     res.send(user);
//     console.log("Hey");
// })

// //post
// app.post('/', (req,res)=> {
//     res.send(user1);
// })

// //

// app.listen(port, console.log(`Your server listening on localhost ${port}`));