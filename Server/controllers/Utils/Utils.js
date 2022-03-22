

 const fs = require('fs');
 const path = require('path');

 exports.buildCCPHosp1 = () => {
   // load the common connection configuration file
   const ccpPath = path.resolve(__dirname, '..', '..','..','test-network',
     'organizations', 'peerOrganizations', 'hosp1apollo.chaincare.com', 'connection-hosp1apollo.json');
   const fileExists = fs.existsSync(ccpPath);
   if (!fileExists) {
     throw new Error(`no such file or directory: ${ccpPath}`);
   }
   const contents = fs.readFileSync(ccpPath, 'utf8');
 
   // build a JSON object from the file contents
   const ccp = JSON.parse(contents);
 
   console.log(`Loaded the network configuration located at ${ccpPath}`);
   return ccp;
 };
 

 exports.buildCCPHosp2 = () => {
   // load the common connection configuration file
   const ccpPath = path.resolve(__dirname, '..', '..','..','test-network',
     'organizations', 'peerOrganizations', 'hosp2vijaya.chaincare.com', 'connection-hosp2vijaya.json');
   const fileExists = fs.existsSync(ccpPath);
   if (!fileExists) {
     throw new Error(`no such file or directory: ${ccpPath}`);
   }
   const contents = fs.readFileSync(ccpPath, 'utf8');
 
   // build a JSON object from the file contents
   const ccp = JSON.parse(contents);
 
   console.log(`Loaded the network configuration located at ${ccpPath}`);
   return ccp;
 };
 

 exports.buildCCPHosp3 = () => {
   // load the common connection configuration file
   const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network',
     'organizations', 'peerOrganizations', 'hosp3stanley.chaincare.com', 'connection-hosp3stanley.json');
   const fileExists = fs.existsSync(ccpPath);
   if (!fileExists) {
     throw new Error(`no such file or directory: ${ccpPath}`);
   }
   const contents = fs.readFileSync(ccpPath, 'utf8');
 
   // build a JSON object from the file contents
   const ccp = JSON.parse(contents);
 
   console.log(`Loaded the network configuration located at ${ccpPath}`);
   return ccp;
 };

 exports.buildCCPIns1 = () => {
  // load the common connection configuration file
  const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network',
    'organizations', 'peerOrganizations', 'Ins1starhealth.chaincare.com', 'connection-Ins1starhealth.json');
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, 'utf8');

  // build a JSON object from the file contents
  const ccp = JSON.parse(contents);

  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
};
 

 exports.buildWallet = async (Wallets, walletPath) => {
   // Create a new  wallet : Note that wallet is for managing identities.
   let wallet;
   if (walletPath) {
     wallet = await Wallets.newFileSystemWallet(walletPath);
     console.log(`Built a file system wallet at ${walletPath}`);
   } else {
     wallet = await Wallets.newInMemoryWallet();
     console.log('Built an in memory wallet');
   }
 
   return wallet;
 };
 

 exports.prettyJSONString = (inputString) => {
   if (inputString) {
     return JSON.stringify(JSON.parse(inputString), null, 2);
   } else {
     return inputString;
   }
 };
 