
const {buildCAClient, registerAndEnrollUser} = require('./Utils/CaUtils.js');
const {buildCCPHosp1, buildCCPHosp2, buildWallet, buildCCPHosp3} = require('./Utils/Utils.js');
const {Wallets} = require('fabric-network');
const walletPath = path.join(__dirname, '../wallet');
const network = require('../Utils/app.js');
const crypto = require('crypto');
const exp = require('constants');

let caClient
let isLoggedIn

exports.doctorLogin = async (hospid,password,DocID_or_PID,emailId) => {
    
    const networkobj = network.connectToNetwork(DocID_or_PID);
    const auth_check_res = network.invoke(networkobj,true,'Admin_readDoctor',DocID_or_PID);
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

exports.patientLogin = async (hospid,password,DocID_or_PID,emailId) => {
    
    const networkobj = network.connectToNetwork(DocID_or_PID);
    const auth_check_res = network.invoke(networkobj,true,'Admin_readPatient',DocID_or_PID);
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

exports.adminLogin = async () => {
    const networkobj = network.connectToNetwork(DocID_or_PID);

}
