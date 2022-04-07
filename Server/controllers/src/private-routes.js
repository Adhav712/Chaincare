const network = require("../Utils/network.js");
const prettyJSONString = require("../Utils/Utils.js");

exports.Private_Submit_transcations = async (req,res) => {
  const {org,hospid,AdminID,private_func,PID,PName,bill_amount,publicDescription} = req.body;
  {
    
    const networkObj = await network.connectToNetwork_forPrivate(req,res,org,hospid,AdminID);
    // console.log("9 networkObj:",networkObj);
    const PrivateCollectionName = await network.gettingPrivateCollectionname(org,hospid);
    console.log("10 PrivateCollectionName:",PrivateCollectionName);

    const myChannel = "hospitalchannel";
    const myChaincodeName = "private";
    const memberAssetCollectionName = "billCollection";

    const args = {
      bill_properties : {ID: PID,
        name: PName,
        billamount: bill_amount,
        publicDesc: publicDescription
        }
      };
      const transientData = JSON.stringify(args);
    console.log(`18 transientData: ${ (transientData)}`);
          // const networkOrg =  await networkObj.getNetwork(myChannel);
          // const contractOrg = networkOrg.getContract(myChaincodeName);
          // contractOrg.addDiscoveryInterest({ name: myChaincodeName, collectionNames: [memberAssetCollectionName, PrivateCollectionName.PrivateCollectionName] });

          if(private_func == "CreateBill")
            {
            let result 
            let message; 
            if (private_func === "CreateBill") {
              let BILL_PROPERTIES_String = JSON.parse(transientData)
              console.log("BILL_PROPERTIES_String:",BILL_PROPERTIES_String);
              let key = Object.keys (BILL_PROPERTIES_String)[0] 
              const transientDataBuffer = {}

              transientDataBuffer[key] = Buffer.from(JSON.stringify(BILL_PROPERTIES_String.bill_properties))

              console.log(`before sending=====================================================`)
              result = await networkObj.contract.createTransaction(private_func)
                .setTransient(transientDataBuffer)
                .submit()
              const resultJSON =  prettyJSONString.prettyJSONString(result.toString());
              console.log( `result is ================: ${resultJSON}`)
              //contract.setTransient(transientData) 
              // result = await contract.submitTransaction(private_func); 
              message = `Successfully submitter transient data`
              
              // result = JSON.parse(result.toString());
              // console.log(`result is ================: ${resultJSON}`)

              res.status(200).send(`Successfully created Patient Private bill ${resultJSON}`);
            }else {
                return `Invocation require either createCar or changeCarowner as function but got ${resultJSON}`
            }
          
         }
          else if(private_func == "UpdateBill")
            {
              let result 
              let message; 
              let BILL_PROPERTIES_String = JSON.parse(transientData)
              console.log("BILL_PROPERTIES_String:",BILL_PROPERTIES_String);
              let key = Object.keys (BILL_PROPERTIES_String)[0] 
              const transientDataBuffer = {}

              transientDataBuffer[key] = Buffer.from(JSON.stringify(BILL_PROPERTIES_String.bill_properties))

              console.log(`before sending=====================================================`)
              result = await networkObj.contract.createTransaction(private_func)
                .setTransient(transientDataBuffer)
                .submit()
              const resultJSON =  prettyJSONString.prettyJSONString(result.toString());
              console.log( `result is ================: ${resultJSON}`)
              //contract.setTransient(transientData) 
              // result = await contract.submitTransaction(private_func); 
              message = `Successfully submitter transient data`
                res.status(200).send(`Successfully updated Patient Private bill ${JSON.stringify(resultJSON)}`);
                

            }
           else if(private_func == "ReadBill"){ 
              const result = await networkObj.contract.evaluateTransaction('ReadBill',PID);
              const resultJSON =  prettyJSONString.prettyJSONString(result.toString());
              res.status(200).send(`Successfully queried Patient Private bill ${resultJSON}`);
              console.log("Quried result",resultJSON);
              return resultJSON;
            }

           else if(private_func == "ReadBillPrivateDetails")
            { 
              const result = await networkObj.contract.evaluateTransaction('ReadBillPrivateDetails',PrivateCollectionName, PID);
              const resultJSON =  prettyJSONString.prettyJSONString(result.toString());
              res.status(200).send(`Successfully queried Patient Private bill ${resultJSON}`);
              console.log("Quried result",resultJSON);
              return resultJSON;
            }

           else if(private_func == "ReadOrg1BillPrivateDetails")
           {
            const result = await networkObj.contract.evaluateTransaction('ReadOrg1BillPrivateDetails', PID);
            const resultJSON =  prettyJSONString.prettyJSONString(result.toString());
            res.status(200).send(`Successfully queried Patient Private bill ${resultJSON}`);
            console.log("Quried result",resultJSON);
            return resultJSON;
           }

           else if(private_func == "ReadOrg2BillPrivateDetails")
           {
            const result = await networkObj.contract.evaluateTransaction('ReadOrg2BillPrivateDetails', PID);
            const resultJSON =  prettyJSONString.prettyJSONString(result.toString());
            res.status(200).send(`Successfully queried Patient Private bill ${resultJSON}`);
            console.log("Quried result",resultJSON);
            return resultJSON;
           }

           else{

           }
      // Disconnect from the gateway peer when all work for this client identity is complete
      
  }(error) => {
    console.error(`Error in transaction: ${error}`);
    if (error.stack) {
        console.error(error.stack);
    }
    process.exit(1);
  }
} 