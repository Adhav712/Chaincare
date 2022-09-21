const network = require("../Utils/network.js");
const { prettyJSONString } = require("../Utils/Utils.js");

//--------------------------Doctor Submit Transcations------------------------------
exports.Doctor_submit_transcations = async(req,res,org,hospid,DocID)=>{
  const networkObj = await network.connectToNetwork(req,res,org,hospid,DocID);
  const {function_Name,patientId,firstName, lastName, password, age, phoneNumber,address, bloodGroup, fields,
         newSymptoms ,newDiagnosis ,newTreatment ,newFollowUp,updatedBys} = req.body;

  const doctorId = DocID;
  if(function_Name == "doctor_update_details"){
    const UpdateDoctor_Detials_Res  = await networkObj.contract.submitTransaction('Doctor_updateDoctor',doctorId, firstName,
     lastName, password, age, phoneNumber,address, bloodGroup, fields);
    await networkObj.gateway.disconnect();  
    
    if (UpdateDoctor_Detials_Res.error) {
      res.status(400).send(UpdateDoctor_Detials_Res.error);
    }
    res.status(201).json(`${prettyJSONString(UpdateDoctor_Detials_Res)}`);

  }else if(function_Name == "Doctor_updatePatientDetails"){
    const Update_Patient_Detials_Res  = await networkObj.contract.submitTransaction('Doctor_updatePatientDetails',patientId,
    newSymptoms ,newDiagnosis ,newTreatment ,newFollowUp,updatedBys);
      await networkObj.gateway.disconnect();  
    
      if (Update_Patient_Detials_Res.error) {
        res.status(400).send(Update_Patient_Detials_Res.error);
      }      
      res.status(201).json(`${prettyJSONString(Update_Patient_Detials_Res)}`);

  }else{
    res.status(300).send('Invalid function triggered');
  }

}

//--------------------------------Doctor Query transcations -----------------------------

exports.Doctor_query = async(req,res,org,hospid,DocID) => {
  const networkObj = await network.connectToNetwork(req,res,org,hospid,DocID);
    // const {patientId,firstName,lastName,query} = req.body;

    const queryName = req.headers.query;
    console.log("queryName:",queryName);
    console.log("req.user.PID:",req.user.ID);
    if(queryName === "Doctor_ReadPatients"){
      const response = await networkObj.contract.evaluateTransaction(queryName,patientId,doctorId);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(201).send(`Patient ${patientId} doen't give permission`);  
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${prettyJSONString(response)}`);
      res.status(201).json(`${prettyJSONString(response)}`);
    }

    if(queryName === "Doctor_readDoctor"){
      console.log("queryName:",queryName);
      console.log("req.user.PID:",req.user.ID);
      const response = await networkObj.contract.evaluateTransaction(queryName, req.user.ID);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${prettyJSONString(response)}`);
      res.status(201).json(`${prettyJSONString(response)}`);

    }else if(queryName === "Doctor_queryPatientsByFirstName"){
      const response = await networkObj.contract.evaluateTransaction(queryName, firstName);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${prettyJSONString(response)}`);
      res.status(201).json(`${prettyJSONString(response)}`);

    }else if(queryName === "Doctor_queryPatientsByLastName"){
      const response = await networkObj.contract.evaluateTransaction(queryName, lastName);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${prettyJSONString(response)}`);
      res.status(201).json(`${prettyJSONString(response)}`);
    }else{
      
    }
}