
//const {buildCAClient, registerAndEnrollUser} = require('./Utils/CaUtils.js');
//const {buildCCPHosp1, buildCCPHosp2, buildWallet, buildCCPHosp3} = require('./Utils/Utils.js');
//const {Wallets} = require('fabric-network');
//const walletPath = path.join(__dirname, '../wallet');
const network = require('./network.js');
const crypto = require('crypto');
//const exp = require('constants');

let caClient
let isLoggedIn

exports.doctorLogin = async (hospid,password,DocID_PID_AdminID,emailId) => {
    
    const networkobj = network.connectToNetwork(hospid,DocID_PID_AdminID);
    const auth_check_res = network.invoke(networkobj,true,'Admin_readDoctor',DocID_PID_AdminID);
    const res = auth_check_res.toString();
    const mailId = res.emailID[0];
    const en_pass = res.password[0];
    const pass = crypto.createHash('sha256').update(password).digest('hex');  
    if(pass === en_pass && emailId === mailId){
        return (isLoggedIn === true);
    }else{
        return (isLoggedIn === false);
    }
}

exports.patientLogin = async (hospid,password,DocID_PID_AdminID,emailId) => {
    
    const networkobj = network.connectToNetwork(hospid,DocID_PID_AdminID);
    const auth_check_res = network.invoke(networkobj,true,'Admin_readPatient',DocID_PID_AdminID);
    const res = auth_check_res.toString();
    const mailId = res.emailID[0];
    const en_pass = res.password[0];
    const pass = crypto.createHash('sha256').update(password).digest('hex');  
    if(pass === en_pass && emailId === mailId){
        return (isLoggedIn === true);
    }else{
        return (isLoggedIn === false);
    }
}

exports.adminLogin = async (hospid,password,DocID_PID_AdminID,emailId,res) => {
    const networkobj = network.connectToNetwork(hospid,DocID_PID_AdminID);
    const auth_check_res = network.invoke(networkobj,true,'Admin_readOwnDetails',DocID_PID_AdminID);
    const result = auth_check_res.toString();
    const mailId = result.emailID;
    const en_pass = result.password;
    const pass = crypto.createHash('sha256').update(password).digest('hex');  
    if(pass === en_pass && emailId === mailId){
        res.status(200).send("authenticated");
        return (isLoggedIn === true);
        
    }else{
        res.status(500).send("Check your credentials or Internal server error")
        return (isLoggedIn === false);
    }
    

}
