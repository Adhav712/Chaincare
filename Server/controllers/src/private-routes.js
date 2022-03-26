exports.connectToNetwork = async function(req,res,org,hospid,DocID_PID_AdminID) {
    const channelName = 'hospitalchannel';
    const chaincodeName = 'private';
    
    const gateway = new Gateway();
    const hospitalId = parseInt(hospid);
     if(org == "hospital"){
       if (hospitalId === 1) { 
         const ccpPath = path.resolve(__dirname, '..', '..' ,'..','test-network', 'organizations', 'peerOrganizations', 'hosp1apollo.chaincare.com', 'connection-hosp1apollo.json');
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
       } else if (hospitalId === 2) 
       
       {
         
         const ccpPath = path.resolve(__dirname, '..', '..','..','test-network','organizations', 'peerOrganizations', 'hosp2vijaya.chaincare.com', 'connection-hosp2vijaya.json');
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
 
         
       }else if (hospitalId === 3) {
         
         // load the common connection configuration file
         const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network','organizations', 'peerOrganizations', 'hosp3stanley.chaincare.com', 'connection-hosp3stanley.json');
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
 
       }else{
         res.stats(400).send("Unable to connect to network");
       }
     }else if(org == "Insurance"){
       const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network','organizations', 'peerOrganizations',
        'Ins1starhealth.chaincare.com', 'connection-Ins1starhealth.json');
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
 
     }else{
       res.status(400).send("Unable to connect to network");
     }
}

exports.Private_Submit_transcations = async (req,res) => {
  try{
    const {req,res,org,hospid,DocID_PID_AdminID,private_func,PID,PName,bill_amount,publicDescription} = req.body;
    const networkObj = await connectNetwork(req,res,org,hospid,DocID_PID_AdminID);
    
    const myChannel = "hospitalchannel";
    const myChaincodeName = "private";
    const memberAssetCollectionName = "billCollection";
   if(org == "hospital"){
      if(hospid == 1){
        const PrivateCollectionName = "hosp1apolloMSPPrivateCollection"; 
        return PrivateCollectionName   
      }else if(hospid == 2){
        const PrivateCollectionName = "hosp2vijayaMSPPrivateCollection";    
        return PrivateCollectionName
      }else if(hospid == 3){
        const PrivateCollectionName = "hosp3stanleyMSPPrivateCollection";    
        return PrivateCollectionName
      }
   }else if(org =="Insurance"){
    const PrivateCollectionName = "Ins1starhealthMSPPrivateCollection"; 
    return PrivateCollectionName
   }
   
    // const hosp1PrivateCollectionName = "hosp1apolloMSPPrivateCollection";
    // const hosp2PrivateCollectionName = "hosp2vijayaMSPPrivateCollection";
    // const hosp3PrivateCollectionName = "hosp3stanleyMSPPrivateCollection";
    // const Ins1PrivateCollectionName = "Ins1starhealthMSPPrivateCollection";
    

   try{
          if(org == "hospital"){
              if(hospid == 1){
                const networkOrg = await networkObj.getNetwork(myChannel);
                const contractOrg = networkOrg.getContract(myChaincodeName);
                contractOrg.addDiscoveryInterest({ name: myChaincodeName, collectionNames: [memberAssetCollectionName, PrivateCollectionName] });
              }
              else if(hospid == 2)
              {
                const networkOrg = await networkObj.getNetwork(myChannel);
                const contractOrg = networkOrg.getContract(myChaincodeName);
                contractOrg.addDiscoveryInterest({ name: myChaincodeName, collectionNames: [memberAssetCollectionName, PrivateCollectionName] });
              }
              else if(hospid == 3)
              {
                const networkOrg = await networkObj.getNetwork(myChannel);
                const contractOrg = networkOrg.getContract(myChaincodeName);
                contractOrg.addDiscoveryInterest({ name: myChaincodeName, collectionNames: [memberAssetCollectionName, PrivateCollectionName] });
              }
         }else if(org == "Insurance"){
              const networkOrg = await networkObj.getNetwork(myChannel);
              const contractOrg = networkOrg.getContract(myChaincodeName);
              contractOrg.addDiscoveryInterest({ name: myChaincodeName, collectionNames: [memberAssetCollectionName, PrivateCollectionName] });
         }else{
              res.stats(300).send("Select the proper option");
        }

          if(private_func == "CreateBill")
            {
              let BILL_PROPERTIES = { ID: PID, name: PName, billamount: bill_amount, publicDesc: publicDescription };
              console.log('\n**************** As Org1 Client ****************');
              console.log('Adding Public details to work with:\n--> Submit Transaction: CreateBill ' + PID);
              let statefulTxn = contractOrg.createTransaction('CreateBill');
              //if you need to customize endorsement to specific set of Orgs, use setEndorsingOrganizations
              //statefulTxn.setEndorsingOrganizations(mspOrg1);
              let tmapData = Buffer.from(JSON.stringify(BILL_PROPERTIES));
              statefulTxn.setTransient({
                  bill_details: tmapData
              });
              result = await statefulTxn.submit();
              console.log("Bill Created: ",result);
            }
          else if(private_func = "UpdateBill")
            {
              let BILL_PROPERTIES = { ID: PID, name: PName, billamount: bill_amount, publicDesc: publicDescription };
              console.log('\n**************** As Org1 Client ****************');
              console.log('Adding Public details to work with:\n--> Submit Transaction: UpdateBill ' + PID);
              let statefulTxn = contractOrg.createTransaction('UpdateBill');
              //if you need to customize endorsement to specific set of Orgs, use setEndorsingOrganizations
              //statefulTxn.setEndorsingOrganizations(mspOrg1);
              let tmapData = Buffer.from(JSON.stringify(BILL_PROPERTIES));
              statefulTxn.setTransient({
                  bill_details: tmapData
              });
              result = await statefulTxn.submit();
              console.log("Bill Updated: ",result);
            }
           else if(private_func == "ReadBill") 
            {

            }
           else if(private_func == "ReadBillPrivateDetails")
            { 
              result = await contractOrg1.evaluateTransaction('ReadBillPrivateDetails', PrivateCollectionName, PID);
              console.log(`<-- result: ${prettyJSONString(result.toString())}`);
            }
           else if(private_func == "ReadOrg1BillPrivateDetails")
           {
             
           } 
           else if(private_func == "ReadOrg2BillPrivateDetails")
           {
             
           }
           else{

           }
      }finally {
      // Disconnect from the gateway peer when all work for this client identity is complete
      gatewayOrg1.disconnect();
      gatewayOrg2.disconnect();
    }
  }catch (error) {
    console.error(`Error in transaction: ${error}`);
    if (error.stack) {
        console.error(error.stack);
    }
    process.exit(1);
  }
} 