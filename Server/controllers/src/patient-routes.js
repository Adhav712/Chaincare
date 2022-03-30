const network = require("../Utils/network.js");
const { prettyJSONString } = require("../Utils/Utils.js");

//--------------------------Patient Submit Transcations------------------------------
exports.Patient_Submit_transcations = async(req,res,org,hospid,AdminID) => {
    const networkObj = await network.connectToNetwork(req,res,org,hospid,AdminID);
    const{fun_name,patientId, newFirstname,newLastName,newPassword,newAge,updatedBy,newPhoneNumber,newEmergPhoneNumber,newAddress,doctorId}=req.body;

    if(fun_name == "Patient_updatePatient"){
         
        const UpdatePatient_Detials_Res  = await networkObj.contract.submitTransaction('Patient_updatePatient',patientId, newFirstname,newLastName,
         newPassword,newAge,updatedBy,newPhoneNumber,newEmergPhoneNumber,newAddress);
        await networkObj.gateway.disconnect();  
      
        if (UpdatePatient_Detials_Res.error) {
          res.status(400).send(UpdatePatient_Detials_Res.error);
        }
        res.status(201).send(`Successfully updated patient details :${prettyJSONString(UpdatePatient_Detials_Res)}`);
    }else if(fun_name == "Patient_updatePatientPassword"){
        
        const Update_Patient_Password_Res  = await networkObj.contract.submitTransaction('Patient_updatePatientPassword',patientId,newPassword);
        await networkObj.gateway.disconnect();  
    
        if (Update_Patient_Password_Res.error) {
        res.status(400).send(Update_Patient_Password_Res.error);
        }
        res.status(201).send(`Successfully updated Patient Password :${prettyJSONString(Update_Patient_Password_Res)}`);

    }else if(fun_name == "Patient_grantAccessToDoctor"){

        const Patient_grantAccessToDoctor  = await networkObj.contract.submitTransaction('Patient_grantAccessToDoctor',patientId,doctorId);
        await networkObj.gateway.disconnect();  
    
        if (Patient_grantAccessToDoctor.error) {
        res.status(400).send(Patient_grantAccessToDoctor.error);
        }
        res.status(201).send(`Successfully Granted Permission :${prettyJSONString(Patient_grantAccessToDoctor)}`);

        
    }else if(fun_name == "Patient_revokeAccessFromDoctor"){
       
        const Patient_revokeAccessFromDoctor  = await networkObj.contract.submitTransaction('Patient_revokeAccessFromDoctor',patientId,doctorId);
        await networkObj.gateway.disconnect();  
    
        if (Patient_revokeAccessFromDoctor.error) {
        res.status(400).send(Patient_revokeAccessFromDoctor.error);
        }
        res.status(201).send(`Successfully Revoke Permission :${prettyJSONString(Patient_revokeAccessFromDoctor)}`);

    }else{

    }
}


//--------------------------------Patient Query transcations -----------------------------

exports.Patient_query = async(req,res,org,hospid,AdminID) => {
  const networkObj = await network.connectToNetwork(req,res,org,hospid,AdminID);
    const {queryName,patientId} = req.body;
    
    if(queryName == "Patient_readPatient"){
        const response = await networkObj.contract.evaluateTransaction("Patient_readPatient",patientId);
        
        await networkObj.gateway.disconnect();  
        
        if (response.error) {
            res.status(400).send(response.error);
        }
        console.log(`Transaction has been evaluated, result is: ${prettyJSONString(response)}`);
        res.status(201).send(`Transaction has been evaluated, result is: ${prettyJSONString(response)}`);
        console.log();
    }else{
      
    }
}