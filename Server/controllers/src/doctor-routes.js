const network = require("../Utils/network.js");

//--------------------------Doctor Submit Transcations------------------------------
exports.doctor_update_details = async(req,res,org,hospid,AdminID) => {
    const networkObj = await network.connectToNetwork(org,hospid,AdminID);
    const {doctorId, firstName, lastName, password, age,
        phoneNumber,address, bloodGroup, fields} = req.body;
  
    const UpdateDoctor_Detials_Res  = await networkObj.contract.submitTransaction('Doctor_updateDoctor',doctorId, firstName,
     lastName, password, age, phoneNumber,address, bloodGroup, fields);
    await networkObj.gateway.disconnect();  
  
    if (UpdateDoctor_Detials_Res.error) {
      res.status(400).send(UpdateDoctor_Detials_Res.error);
    }
    res.status(201).send('Successfully updated doctor details :',UpdateDoctor_Detials_Res);
}

exports.doctor_update_patient_details = async(req,res,org,hospid,AdminID) => {
  const networkObj = await network.connectToNetwork(org,hospid,AdminID);
    const {patientId, newSymptoms ,newDiagnosis ,newTreatment ,newFollowUp,updatedBys} = req.body;
  
    const Update_Patient_Detials_Res  = await networkObj.contract.submitTransaction('Doctor_updatePatientDetails',patientId,
     newSymptoms ,newDiagnosis ,newTreatment ,newFollowUp,updatedBys);
    await networkObj.gateway.disconnect();  
  
    if (Update_Patient_Detials_Res.error) {
      res.status(400).send(Update_Patient_Detials_Res.error);
    }
    res.status(201).send('Successfully updated doctor details :',Update_Patient_Detials_Res);
}

//--------------------------------Doctor Query transcations -----------------------------

exports.Doctor_query = async(req,res,org,hospid,AdminID) => {
  const networkObj = await network.connectToNetwork(org,hospid,AdminID);
    const {patientId,doctorId,firstName,lastName,queryName} = req.body;
    
    if(queryName == "Doctor_ReadPatient"){
      const response = await networkObj.contract.evaluateTransaction(queryName,patientId,doctorId);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
    }else if(queryName == "Doctor_readDoctor"){
      const response = await networkObj.contract.evaluateTransaction(queryName, doctorId);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);

    }else if(queryName == "Doctor_queryPatientsByFirstName"){
      const response = await networkObj.contract.evaluateTransaction(queryName, firstName);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);

    }else if(queryName == "Doctor_queryPatientsByLastName"){
      const response = await networkObj.contract.evaluateTransaction(queryName, lastName);
      
      await networkObj.gateway.disconnect();  
    
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
    }else{
      
    }
}