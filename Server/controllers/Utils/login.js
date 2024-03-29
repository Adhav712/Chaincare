require('dotenv').config();
const network = require('./network.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const express = require('express');

//const exp = require('constants');

let caClient
let isLoggedIn;
const app = express()
app.use(cookieParser())

function generatejwttoken(res,req,emailId,choose_org,hospid,AdminID,adminid,PID,DocID,Insurance_adminid){
    console.log({
        emailId : emailId,
        choose_org : choose_org,
        hospid : hospid,
        AdminID : AdminID,
        ID : adminid
    });
    let payload = {
        emailId: emailId,
        choose_org: choose_org,
        hospid: hospid,
        AdminID: AdminID,
        ID: adminid
    }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30m'},{ algorithm : 'HS256'} );
    console.log("27 login server side page accessToken",accessToken);
    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    


    
    // localStorage.setItem('accessToken',accessToken);
    // const st =  sessionStorage.setItem("test1", "Lorem ipsum");
    // console.log("sessionStorage",st);
    
    // if(PID !== null){
    //     console.log("PID",PID);
    //     cookieset(PID);
    // }else if(DocID !== null){
    //     console.log("DocID",DocID);
    //     cookieset(DocID);
    // }else if(Insurance_adminid !== null){
    //     console.log("Insurance_adminid",Insurance_adminid);
    //     cookieset(Insurance_adminid);
    // }else if(AdminID !== null){
    //     console.log("AdminID",AdminID);
    //     cookieset(AdminID);
    // }
    
    // const cookieset = async (name) => {
    // }
    
    
    res.cookie(`accessToken`, accessToken, { maxAge: 90000000, httpOnly: true });
    console.log("cookie set successfully");
    
    // if(PID !== "" || DocID !== ""  || Insurance_adminid !== "" || AdminID !== ""){
    //     console.log(PID,DocID,Insurance_adminid,AdminID);    
    //     res.cookie(`jwt-${DocID}`, accessToken, { maxAge: 3600000 });
    //     console.log("jwt",res.cookie);
    // }

    // res.setHeader("set-cookie",[`JWT_TOKEN=${accessToken}; httponly; samesite=lax`]);
    // console.log("set-cookie",res.setHeader);
    
    return accessToken;
}

exports.auth = async(res,req,auth_check_res,password,emailId,choose_org,hospid,AdminID,adminid,PID,DocID,Insurance_adminid) => {
    try{
        const result =  JSON.parse(auth_check_res);
        const mailId = result.emailId;
        const en_pass = result.password;
        const pass = crypto.createHash('sha256').update(password).digest('hex');
        const isLoggedIn = false;
        if(password == en_pass && emailId == mailId){
            accessToken = generatejwttoken(res,req,emailId,choose_org,hospid,AdminID,adminid);
            console.log("accessToken",accessToken);
            console.log("Authenticated");
            await res.status(200).json({
                auth : "authenticated",
                accessToken : accessToken
            });
            //does the below return statemnt work?
            return accessToken;
            
        }else{
            if(password !== en_pass){
                console.log("Error in password");
                console.log(password + " " + en_pass);
                await res.status(500).json("Check your password or Internal server error");
                return (isLoggedIn == false);
            }
            if(emailId !== mailId){
                console.log("Error in email");
                console.log(emailId + " " + mailId);
                await res.status(500).json("Check your email or Internal server error")
                return (isLoggedIn == false);
            }
            console.log("Declined");
            await res.status(500).json("Check your credentials or Internal server error")
            return (isLoggedIn == false);
        }
    }catch(error){
        //if res.status already sended to client then don't send it again
        if(res.headersSent){
            console.log(error);
            console.log("-----------------------------------------------------------------------------------------------------")
        }else{
            res.status(500).json(auth_check_res);
        }
    }
}


exports.doctorLogin = async (res,req,choose_org,hospid,AdminID,DocID,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}" ,hospid:${hospid} ,AdminID:${AdminID} ,DocID:${DocID} ,emailId:${emailId} ,password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'Admin_readDoctor',DocID);

    exports.auth(res,req,auth_check_res,password,emailId,choose_org,hospid,AdminID,DocID,);

}

exports.patientLogin = async (res,req,choose_org,hospid,AdminID,PID,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}", hospid:${hospid}, AdminID:${AdminID}, PID:${PID}, emailId:${emailId} ,password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'Admin_readPatient',PID);

    exports.auth(res,req,auth_check_res,password,emailId,choose_org,hospid,AdminID,PID);
}

exports.adminLogin = async (res,req,choose_org,hospid,AdminID,adminid,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}" ,hospid:${hospid} ,AdminID:${AdminID}, adminid:${adminid}, emailId:${emailId}, password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'readAdminDetails',adminid);

    exports.auth(res,req,auth_check_res,password,emailId,choose_org,hospid,AdminID,adminid);
    
}

exports.InsuranceAdminLogin = async (res,req,choose_org,adminid,Insurance_adminid,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}", adminid:${adminid}, Insurance_adminid:${Insurance_adminid}, emailId:${emailId}, password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =   await network.connectToNetwork(req,res,choose_org,'',Insurance_adminid);    
    const auth_check_res =  await network.invoke(networkObj,true,'readAdminDetails',adminid);

    exports.auth(res,req,auth_check_res,password,emailId,choose_org,adminid,Insurance_adminid);
    //const result =  auth_check_res.toString();    
}