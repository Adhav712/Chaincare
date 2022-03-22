// Bring common classes into scope, and Fabric SDK network class
// const {ROLE_ADMIN, ROLE_DOCTOR, capitalize, getMessage, validateRole, createRedisClient} = require('../utils.js');
const network = require("../Utils/network.js");


exports.createPatient = async (req, res, hospid, AdminID) => {

        // Set up and connect to Fabric Gateway using the username in header
        const networkObj = await network.connectToNetwork(hospid,AdminID);

        
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

  res.status(201).send(getMessage(false, 'Successfully registered Patient.', req.body.patientId, req.body.password));
};


exports.createDoctor = async (req, res, hospid, AdminID) => {

    const networkObj = await network.connectToNetwork(hospid,AdminID);

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
    await network.registerUser(userData);

    res.status(201).send('Successfully registered Doctor.', new_DocID,emailId, firstName, lastName,password, age,phoneNumber,Fields, password);
};


exports.getAllPatients = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  await validateRole([ROLE_ADMIN, ROLE_DOCTOR], userRole, res);
  // Set up and connect to Fabric Gateway using the username in header
  const networkObj = await network.connectToNetwork(req.headers.username);
  // Invoke the smart contract function
  const response = await network.invoke(networkObj, true, capitalize(userRole) + 'Contract:queryAllPatients', userRole === ROLE_DOCTOR ? req.headers.username : '');
  const parsedResponse = await JSON.parse(response);
  res.status(200).send(parsedResponse);
};


exports.readPatient = async (req,res) => {
    
};
