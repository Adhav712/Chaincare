const network = require("../Utils/network.js");


//--------------------------------Insurance Query transcations -----------------------------

exports.Insurance_query = async(req,res,org,AdminID) => {
    
    const networkObj = await network.connectToNetwork(req,res,org,'',AdminID);
      const {queryName,patientId} = req.body;
      
      if(queryName == "Ins_ReadPatients"){
          const response = await networkObj.contract.evaluateTransaction("Ins_ReadPatients",patientId);
          
          await networkObj.gateway.disconnect();  
          
          if (response.error) {
              res.status(400).send(response.error);
          }
          console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
          res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
      }else{
        
      }
  }