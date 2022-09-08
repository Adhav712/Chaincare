 const {Gateway, Wallets} = require('fabric-network');
 const FabricCAServices = require('fabric-ca-client');
 const path = require('path');
 const fs = require('fs');
 const {buildCAClient, registerAndEnrollUser} = require('./CaUtils.js');
 const {buildCCPHosp3, buildCCPHosp2, buildCCPHosp1, buildWallet} = require('./Utils.js');
 
 const channelName = 'hospitalchannel';
 const chaincodeName = 'chaincare';
 const mspOrg1 = 'hosp1MSP';
 const mspOrg2 = 'hosp2MSP';
 const mspOrg3 = 'hosp3MSP';
 const mspIns1 = 'Ins1MSP';
 const walletPath = path.join(__dirname, '../wallet');
 
 exports.ccpPath = async (req,res,org,hospitalId) => {
  if(org == "hospital"){
    if(hospitalId == 1){
      const ccpPath = path.resolve(__dirname, '..', '..' ,'..','test-network', 'organizations', 'peerOrganizations', 'hosp1apollo.chaincare.com', 'connection-hosp1apollo.json');
      return ccpPath;
    }else if(hospitalId == 2){
      const ccpPath = path.resolve(__dirname, '..', '..','..','test-network','organizations', 'peerOrganizations', 'hosp2vijaya.chaincare.com', 'connection-hosp2vijaya.json');
      return ccpPath;
    }else if(hospitalId == 3){
      const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network','organizations', 'peerOrganizations', 'hosp3stanley.chaincare.com', 'connection-hosp3stanley.json');
      return ccpPath;
    }
  }else if(org =="Insurance"){
    const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network','organizations', 'peerOrganizations', 'Ins1starhealth.chaincare.com', 'connection-Ins1starhealth.json');
    return ccpPath;
  }else{
    console.log("Error in connecting to network",37);
    res.status(400).json("Unable to connect to network");
  }
 }
 

 exports.connectToNetwork = async function(req,res,org,hospid,DocID_PID_AdminID) {
   const gateway = new Gateway();
   const hospitalId = parseInt(hospid);
   const ccpPath = await exports.ccpPath(req,res,org,hospitalId);

   const fileExists = fs.existsSync(ccpPath);
        if (!fileExists) {
          throw new Error(`no such file or directory: ${ccpPath}`);
        }
        try{

          const contents = fs.readFileSync(ccpPath, 'utf8');
      
          // build a JSON object from the file contents
          const ccp = JSON.parse(contents);
      
          console.log(`Loaded the network configuration located at ${ccpPath}`);
      
        
          const walletPath = path.join(process.cwd(), 'controllers/wallet');
          console.log("WALLET CHECKING")
      
          const wallet = await buildWallet(Wallets, walletPath);
          
      
          const userExists = await wallet.get(DocID_PID_AdminID);
          if (!userExists) {
            console.log(`An identity for the : ${DocID_PID_AdminID} does not exist in the wallet`);
            console.log(`Create the ${DocID_PID_AdminID} before retrying`);
            const response = {};
            response.error = `An identity for the user ${DocID_PID_AdminID} does not exist in the wallet. Register ${DocID_PID_AdminID} first`;
            return response;
          }
      
          /**
           * setup the gateway instance
           *  he user will now be able to create connections to the fabric network and be able to
           * ubmit transactions and query. All transactions submitted by this gateway will be
           * signed by this user using the credentials stored in the wallet.
           */
          // using asLocalhost as this gateway is using a fabric network deployed locally
          await gateway.connect(ccp, {wallet, identity: DocID_PID_AdminID, discovery: {enabled: true, asLocalhost: true}});
      
          // Build a network instance based on the channel where the smart contract is deployed
          const network = await gateway.getNetwork(channelName);
      
          // Get the contract from the network.
          const contract = network.getContract(chaincodeName);
      
          const networkObj = {
            contract: contract,
            network: network,
            gateway: gateway,
          };
          console.log('Succesfully connected to the network.');
          return networkObj;
        }catch(error){
          console.log("Error in connecting to network",37);
          res.status(400).json(`${error}`);
        }
 };
 

 exports.invoke = async function(networkObj, isQuery, func, args= '') {
   try {
     if (isQuery === true) {
       const response = await networkObj.contract.evaluateTransaction(func, args);
       const result_toString = response.toString()
       console.log(`Transaction has been evaluated, result is: ${result_toString}`);
       await networkObj.gateway.disconnect();
       return result_toString;
     } else {
       if (args) {
         args = JSON.parse(args[0]);
         args = JSON.stringify(args);
       }
       const response = await networkObj.contract.submitTransaction(func, args);
       await networkObj.gateway.disconnect();
       return response;
     }
   } catch (error) {
     const response = {};
     response.error = error;
     console.error(`${error}`);
     return `${error}`;
   }
 };


 exports.registerUser = async function(attributes) {
   const attrs = JSON.parse(attributes);
   const hospitalId = parseInt(attrs.hospitalId);
   const userId = attrs.userId;
 
   if (!userId || !hospitalId) {
     const response = {};
     response.error = 'Error! You need to fill all fields before you can register!';
     return response;
   }
 
   try {
     const wallet = await buildWallet(Wallets, walletPath);
     // TODO: Must be handled in a config file instead of using if
     if (hospitalId === 1) {
       const ccp = buildCCPHosp1();
       const caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp1apollo.chaincare.com');
       await registerAndEnrollUser(caClient, wallet, mspOrg1, userId, 'hosp1apolloadmin', attributes);
     } else if (hospitalId === 2) {
       const ccp = buildCCPHosp2();
       const caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp2vijaya.chaincare.com');
       await registerAndEnrollUser(caClient, wallet, mspOrg2, userId, 'hosp2vijayaadmin', attributes);
     } else if (hospitalId === 3) {
       const ccp = buildCCPHosp3();
       const caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp3stanley.chaincare.com');
       await registerAndEnrollUser(caClient, wallet, mspOrg3, userId, 'hosp3vijayaadmin', attributes);
     }
     console.log(`Successfully registered user: + ${userId}`);
     const response = 'Successfully registered user: '+ userId;
     return response;
   } catch (error) {
     console.error(`Failed to register user + ${userId} + : ${error}`);
     const response = {};
     response.error = error;
     return response;
   }
 };
 
 /**
  * @param  {NetworkObj} networkObj The object which is generated when connectToNetwork is executed
  * @param  {Number} hospitalId
  * @return {JSON} Returns an JSON array consisting of all doctor object.
  * @description Retrieves all the users(doctors) based on user type(doctor) and hospitalId
  */
 exports.getAllDoctorsByHospitalId = async function(networkObj, hospitalId) {
   // Get the User from the identity context
   const users = networkObj.gateway.identityContext.user;
   let caClient;
   const result = [];
   try {
     // TODO: Must be handled in a config file instead of using if
     if (hospitalId === 1) {
       const ccp = buildCCPHosp1();
       caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp1.chaincare.com');
     } else if (hospitalId === 2) {
       const ccp = buildCCPHosp2();
       caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp2.chaincare.com');
     } else if (hospitalId === 3) {
       const ccp = buildCCPHosp3();
       caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp3.chaincare.com');
     }
 
     // Use the identity service to get the user enrolled using the respective CA
     const idService = caClient.newIdentityService();
     const userList = await idService.getAll(users);
 
     // for all identities the attrs can be found
     const identities = userList.result.identities;
 
     for (let i = 0; i < identities.length; i++) {
       tmp = {};
       if (identities[i].type === 'client') {
         tmp.id = identities[i].id;
         tmp.role = identities[i].type;
         attributes = identities[i].attrs;
         // Doctor object will consist of firstName and lastName
         for (let j = 0; j < attributes.length; j++) {
           if (attributes[j].name.endsWith('Name') || attributes[j].name === 'role' || attributes[j].name === 'speciality') {
             tmp[attributes[j].name] = attributes[j].value;
           }
         }
         result.push(tmp);
       }
     }
   } catch (error) {
     console.error(`Unable to get all doctors : ${error}`);
     const response = {};
     response.error = error;
     return response;
   }
   return result.filter(
     function(result) {
       return result.role === 'doctor';
     },
   );
 };
 

 exports.connectToNetwork_forPrivate = async function(req,res,org,hospid,AdminID) {
  const channelName = 'hospitalchannel';
  const chaincodeName = 'private';
  
  const gateway = new Gateway();
  const hospitalId = parseInt(hospid);
  const ccpPath = await exports.ccpPath(req,res,org,hospitalId);
  const fileExists = fs.existsSync(ccpPath);
       if (!fileExists) {
         throw new Error(`no such file or directory: ${ccpPath}`);
       }
       const contents = fs.readFileSync(ccpPath, 'utf8');
   
       // build a JSON object from the file contents
       const ccp = JSON.parse(contents);
   
       console.log(`Loaded the network configuration located at ${ccpPath}`);
   
     
       const walletPath = path.join(process.cwd(), 'controllers/wallet');
       console.log("WALLET CHECKING")
   
       const wallet = await buildWallet(Wallets, walletPath);
       
   
       const userExists = await wallet.get(AdminID);
       if (!userExists) {
         console.log(`An identity for the : ${AdminID} does not exist in the wallet`);
         console.log(`Create the ${AdminID} before retrying`);
         const response = {};
         response.error = `An identity for the user ${AdminID} does not exist in the wallet. Register ${AdminID} first`;
         return response;
       }
   
       /**
        * setup the gateway instance
        *  he user will now be able to create connections to the fabric network and be able to
        * ubmit transactions and query. All transactions submitted by this gateway will be
        * signed by this user using the credentials stored in the wallet.
        */
       // using asLocalhost as this gateway is using a fabric network deployed locally
       await gateway.connect(ccp, {wallet, identity: AdminID, discovery: {enabled: true, asLocalhost: true}});
   
       // Build a network instance based on the channel where the smart contract is deployed
       const network = await gateway.getNetwork(channelName);
   
       // Get the contract from the network.
       const contract = network.getContract(chaincodeName);
   
       const networkObj = {
         contract: contract,
         network: network,
         gateway: gateway,
       };
       console.log('Succesfully connected to the network.');
       return networkObj;
}


exports.gettingPrivateCollectionname = async (org,hospid) => {
  if(org == "hospital"){
    const hospitalId = parseInt(hospid);
      if(hospitalId == 1){
        const PrivateCollectionName = "hosp1apolloMSPPrivateCollection"; 
        return PrivateCollectionName;
      }else if(hospitalId == 2){
        const PrivateCollectionName = "hosp2vijayaMSPPrivateCollection";   
        return PrivateCollectionName;
      }else if(hospitalId == 3){
        const PrivateCollectionName = "hosp3stanleyMSPPrivateCollection";    
        return PrivateCollectionName;
      }
   }else if(org =="Insurance"){
    const PrivateCollectionName = "Ins1starhealthMSPPrivateCollection"; 
     return PrivateCollectionName
   }

}