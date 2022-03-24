const { json } = require("express");
const network = require("../Utils/network.js");

//------------------------Admin Submit Transcations-----------------------
exports.createPatient = async (req, res, org, hospid, AdminID) => {

        // Set up and connect to Fabric Gateway using the username in header
        const networkObj = await network.connectToNetwork(org,hospid,AdminID);

        
        const patientId  = req.body.patientId;
        const emailId = req.body.emailId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const age = req.body.age;
        const phoneNumber = req.body.phoneNumber;

        
        // The request present in the body is converted into a single json string
        const createPatientRes = await networkObj.contract.submitTransaction('Admin_createPatient', patientId, emailId, firstName, lastName, password, age, phoneNumber);
        // Invoke the smart contract function
        if (createPatientRes.error) {
            res.status(400).send(response.error);
          }

        // Enrol and register the user with the CA and adds the user to the wallet.
        const userData = JSON.stringify({hospitalId: hospid, userId: patientId});
        const registerUserRes = await network.registerUser(userData);

        if (registerUserRes.error) {
          await networkObj.contract.submitTransaction('Admin_deletePatient', patientId);
          res.send(registerUserRes.error);
        }

  res.status(201).send('Successfully registered Patient.', req.body.patientId, req.body.password);
};

exports.createDoctor = async (req, res, org, hospid, AdminID) => {


    const networkObj = await network.connectToNetwork(org,hospid,AdminID);

    const new_DocID = req.body.new_DocID;
    const emailId= req.body.emailId;
    const firstName= req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const age= req.body.age;
    const phoneNumber= req.body.phoneNumber;
    const Fields = req.body.Fields;
    
    const DocID = new_DocID;

    //const data = JSON.stringify(DocID, emailId, firstName, lastName , password, age, phoneNumber, Fields);
    await networkObj.contract.submitTransaction('Admin_createDoctor',DocID, emailId, firstName, lastName , password, age, phoneNumber, Fields );
    await networkObj.gateway.disconnect();  

    // Enrol and register the user with the CA and adds the user to the wallet.
    const userData = JSON.stringify({hospitalId: hospid, userId: new_DocID});
    const registerDocRes =  await network.registerUser(userData);

    if (registerDocRes.error) {
      await networkObj.contract.submitTransaction('Admin_deleteDoctor', DocID);
      res.send(registerDocRes.error);
    }

    res.status(201).send('Successfully registered Doctor.', new_DocID,emailId, firstName, lastName,password, age,phoneNumber,Fields, password);

};

exports.deletePatient = async(req,res,org,hospid,AdminID) => {
  const networkObj = await network.connectToNetwork(org,hospid, AdminID);
  
  const patientId = req.body.patientId;
  const PID = JSON.stringify(patientId);
  console.log("77 PID:",PID);

  const deletePatientRes  = await networkObj.contract.submitTransaction('Admin_deletePatient',patientId);
  await networkObj.gateway.disconnect();  

  if (deletePatientRes.error) {
    res.status(400).send(deletePatientRes.error);
  }
  res.status(200).send(`Successfully Deleted PatientID:${PID}`);
}

exports.deleteDoctor = async(req,res,org,hospid,AdminID) => {
  const networkObj = await network.connectToNetwork(org,hospid,AdminID);
  
  const DoctorID = req.body.DocID;

  const deleteDoctorRes  = await networkObj.contract.submitTransaction('Admin_deleteDoctor',DoctorID);
  await networkObj.gateway.disconnect();  

  if (deleteDoctorRes.error) {
    res.status(400).send(response.error);
  }
  res.status(201).send(`Successfully Deleted DoctorID:${DoctorID}`);

}

//------------------------Admin Query Transcations-----------------------

exports.Admin_query = async(req,res,org,hospid,AdminID) => {
    const {patientId,doctorId,firstName,lastName,queryName} = req.body;
    const networkObj = await network.connectToNetwork(org,hospid,AdminID);

    if(queryName == "Admin_readPatient"){
      const response = await networkObj.contract.evaluateTransaction(queryName, patientId);
      await networkObj.gateway.disconnect();
  
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
      return response

    }else if (queryName == "Admin_readDoctor"){
      const response = await networkObj.contract.evaluateTransaction(queryName, doctorId);
      await networkObj.gateway.disconnect();
      
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
      return response

    }else if(queryName == "Admin_queryPatientsByFirstName"){
      const response = await networkObj.contract.evaluateTransaction(queryName, firstName);
      await networkObj.gateway.disconnect();
     
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
      return response
      
    }else if(queryName == "Admin_queryPatientsByLastName"){
      const response = await networkObj.contract.evaluateTransaction(queryName, lastName);
      await networkObj.gateway.disconnect();
     
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      res.status(201).send(`Transaction has been evaluated, result is: ${response.toString()}`);
      return response

    }else{
        // const response = await networkObj.contract.evaluateTransaction(queryName, args);
        //  const result_toString = response.toString()
        //  await networkObj.gateway.disconnect();
         res.status(300).send("Retry wrong transction Triggered!");
    }
    

}
