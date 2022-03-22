 const {Gateway, Wallets} = require('fabric-network');
 const FabricCAServices = require('fabric-ca-client');
 const path = require('path');
 const {buildCAClient, registerAndEnrollUser} = require('./CaUtils.js');
 const {buildCCPHosp3, buildCCPHosp2, buildCCPHosp1, buildWallet} = require('./Utils.js');
 
 const channelName = 'hospitalchannel';
 const chaincodeName = 'chaincare';
 const mspOrg1 = 'hosp1MSP';
 const mspOrg2 = 'hosp2MSP';
 const mspOrg3 = 'hosp3MSP';
 const walletPath = path.join(__dirname, '../wallet');
 
 

 exports.connectToNetwork = async function(hospid,DocID_PID_AdminID) {
   const gateway = new Gateway();
   const hospitalId = parseInt(hospid);
   console.log("19",hospid,DocID_PID_AdminID);  

   if (hospitalId === 1) {
      const ccp = buildCCPHosp1();
        return ccp;
    } else if (hospitalId === 2) {
      const ccp = buildCCPHosp2();
        return ccp;
    } else if (hospitalId === 3) {
      const ccp = buildCCPHosp3();
        return ccp;
    }

   try {
     const walletPath = path.join(process.cwd(), '../wallet');
 
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
   } catch (error) {
     console.log(`Error processing transaction. ${error}`);
     console.log(error.stack);
     const response = {};
     response.error = error;
     return response;
   }
 };
 

 exports.invoke = async function(networkObj, isQuery, func, args= '') {
   try {
     if (isQuery === true) {
       const response = await networkObj.contract.evaluateTransaction(func, args);
       console.log(response);
       await networkObj.gateway.disconnect();
       return response;
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
     console.error(`Failed to submit transaction: ${error}`);
     return response;
   }
 };
 
 /**
  * @author Jathin Sreenivas
  * @param  {string} attributes JSON string in which userId, hospitalId and role must be present.
  * @description For patient attributes also contain the patient object
  * @description Creates a patient/doctor and adds to the wallet to the given hospitalId
  */
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
       await registerAndEnrollUser(caClient, wallet, mspOrg3, userId, 'hosp3vijayadmin', attributes);
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
 