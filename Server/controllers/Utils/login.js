
//const {buildCAClient, registerAndEnrollUser} = require('./Utils/CaUtils.js');
//const {buildCCPHosp1, buildCCPHosp2, buildWallet, buildCCPHosp3} = require('./Utils/Utils.js');
//const {Wallets} = require('fabric-network');
//const walletPath = path.join(__dirname, '../wallet');
const network = require('./network.js');
const crypto = require('crypto');
//const exp = require('constants');

let caClient
let isLoggedIn;


exports.doctorLogin = async (res,req,choose_org,hospid,AdminID,DocID,emailId,password) => {
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    

    const auth_check_res =  await network.invoke(networkObj,true,'Admin_readDoctor',DocID);

    //const result =  auth_check_res.toString();
    const result =  JSON.parse(auth_check_res);
    const mailId = result.emailId;
    const en_pass = result.password;
    const pass = crypto.createHash('sha256').update(password).digest('hex');
    const isLoggedIn = false;
    if(pass == en_pass && emailId == mailId){
        console.log("Authenticated");
        await res.status(200).send("authenticated");
        return (isLoggedIn == true);
        
    }else{
        console.log("Declined");
        await res.status(500).send("Check your credentials or Internal server error")
        return (isLoggedIn == false);
    }
}

exports.patientLogin = async (res,req,choose_org,hospid,AdminID,PID,emailId,password) => {
    
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'Admin_readPatient',PID);

    //const result =  auth_check_res.toString();
    const result =  JSON.parse(auth_check_res);
    const mailId = result.emailId;
    const en_pass = result.password;
    const pass = crypto.createHash('sha256').update(password).digest('hex');
    if(pass == en_pass && emailId == mailId){
        console.log("Authenticated");
        await res.status(200).send("authenticated");
        return true
    }else{
        console.log("Declined");
        await res.status(500).send("Check your credentials or Internal server error")
        return false
    }
}

exports.adminLogin = async (res,req,choose_org,hospid,AdminID,adminid,emailId,password) => {
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'readAdminDetails',adminid);

    //const result =  auth_check_res.toString();
    const result =  JSON.parse(auth_check_res);
    const mailId = result.emailId;
    const en_pass = result.password;
    const pass = crypto.createHash('sha256').update(password).digest('hex');
    if(pass == en_pass && emailId == mailId){
        console.log("Authenticated");
        await res.status(200).send("authenticated");
        return true
    }else{
        console.log("Declined");
        await res.status(500).send("Check your credentials or Internal server error")
        return false
    }
    
}

exports.InsuranceAdminLogin = async (res,req,choose_org,adminid,Insurance_adminid,emailId,password) => {
    const networkObj =   await network.connectToNetwork(req,res,choose_org,'',Insurance_adminid);    
    const auth_check_res =  await network.invoke(networkObj,true,'readAdminDetails',adminid);

    //const result =  auth_check_res.toString();
    const result =  JSON.parse(auth_check_res);
    const mailId = result.emailId;
    const en_pass = result.password;
    const pass = crypto.createHash('sha256').update(password).digest('hex');
    if(pass == en_pass && emailId == mailId){
        console.log("Authenticated");
        await res.status(200).send("authenticated");
        return true
    }else{
        console.log("Declined");
        await res.status(500).send("Check your credentials or Internal server error")
        return false
    }
    
}