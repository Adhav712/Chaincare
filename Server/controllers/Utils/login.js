
//const {buildCAClient, registerAndEnrollUser} = require('./Utils/CaUtils.js');
//const {buildCCPHosp1, buildCCPHosp2, buildWallet, buildCCPHosp3} = require('./Utils/Utils.js');
//const {Wallets} = require('fabric-network');
//const walletPath = path.join(__dirname, '../wallet');
const network = require('./network.js');
const crypto = require('crypto');


//const exp = require('constants');

let caClient
let isLoggedIn;

exports.auth = async(res,req,auth_check_res,password,emailId) => {
    try{
        const result =  JSON.parse(auth_check_res);
        const mailId = result.emailId;
        const en_pass = result.password;
        const pass = crypto.createHash('sha256').update(password).digest('hex');
        const isLoggedIn = false;
        if(password == en_pass && emailId == mailId){
            console.log("Authenticated");
            await res.status(200).json("authenticated");
            return (isLoggedIn == true);
            
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

    exports.auth(res,req,auth_check_res,password,emailId);

}

exports.patientLogin = async (res,req,choose_org,hospid,AdminID,PID,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}", hospid:${hospid}, AdminID:${AdminID}, PID:${PID}, emailId:${emailId} ,password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'Admin_readPatient',PID);

    exports.auth(res,req,auth_check_res,password,emailId);
}

exports.adminLogin = async (res,req,choose_org,hospid,AdminID,adminid,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}" ,hospid:${hospid} ,AdminID:${AdminID}, adminid:${adminid}, emailId:${emailId}, password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =  await network.connectToNetwork(req,res,choose_org,hospid,AdminID);    
    const auth_check_res =  await network.invoke(networkObj,true,'readAdminDetails',adminid);

    exports.auth(res,req,auth_check_res,password,emailId);
    
}

exports.InsuranceAdminLogin = async (res,req,choose_org,adminid,Insurance_adminid,emailId,password) => {
    console.log("-----------------------------------------------------------------------------------------------------------------")
    console.log(`"choose_org:${choose_org}", adminid:${adminid}, Insurance_adminid:${Insurance_adminid}, emailId:${emailId}, password:${password}`);
    console.log("-----------------------------------------------------------------------------------------------------------------")
    const networkObj =   await network.connectToNetwork(req,res,choose_org,'',Insurance_adminid);    
    const auth_check_res =  await network.invoke(networkObj,true,'readAdminDetails',adminid);

    exports.auth(res,req,auth_check_res,password,emailId);
    //const result =  auth_check_res.toString();    
}