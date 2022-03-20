// Bring common classes into scope, and Fabric SDK network class
// const {ROLE_ADMIN, ROLE_DOCTOR, capitalize, getMessage, validateRole, createRedisClient} = require('../utils.js');
const network = require("../Utils/network.js");

/**
 * @param  {Request} req Body must be a patient json and role in the header
 * @param  {Response} res 201 response if asset is created else 400 with a simple json message
 * @description Creates a patient as an user adds the patient to the wallet and an asset(patient) is added to the ledger
 */
exports.createPatient = async (req, res) => {

        // Set up and connect to Fabric Gateway using the username in header
        const networkObj = await network.connectToNetwork(req.username);

        let {patientId,emailId, firstName, lastName,password, age, phoneNumber} = req.body;
        // The request present in the body is converted into a single json string
        const data = JSON.stringify(patientId,emailId, firstName, lastName,password, age, phoneNumber);
        const args = [data];
        // Invoke the smart contract function

        const createPatientRes = await network.invoke(networkObj, false, 'Admin_createPatient', args);
        if (createPatientRes.error) {
            res.status(400).send(response.error);
           }

        // Enrol and register the user with the CA and adds the user to the wallet.
        const userData = JSON.stringify({hospitalId: (req.headers.username).slice(4, 5), userId: req.body.patientId});
        const registerUserRes = await network.registerUser(userData);
        if (registerUserRes.error) {
          await network.invoke(networkObj, false,  'Admin_deletePatient', req.body.patientId);
          res.send(registerUserRes.error);
        }

  res.status(201).send(getMessage(false, 'Successfully registered Patient.', req.body.patientId, req.body.password));
};

/**
 * @param  {Request} req Body must be a doctor json and role in the header
 * @param  {Response} res 201 response if asset is created else 400 with a simple json message
 * @description Creates a doctor as an user adds the doctor to the wallet
 */
exports.createDoctor = async (req, res,hospid,DocID_PID_AdminID) => {
    // This var are adminId and his hospid
    const networkObj = await network.connectToNetwork(hospid,DocID_PID_AdminID);
    
    let {doctorId,emailId, firstName, lastName,password, age,phoneNumber,Fields} = req.body
    // if (!('doctorId' in req.body) || req.body.doctorId === null || req.body.doctorId === '') {
    //   const lastId = await network.invoke(networkObj, true, capitalize(userRole) + 'Contract:getLatestPatientId');
    //   req.body.patientId = 'PID' + (parseInt(lastId.slice(3)) + 1);
    // }

    const data = JSON.stringify(doctorId,emailId, firstName, lastName,password, age,phoneNumber,Fields);
        const args = [data];
    const createDoctorRes = await network.invoke(networkObj, false, 'Admin_createDoctor', args);
        if (createDoctortRes.error) {
            res.status(400).send(response.error);
           }


    
    // Enrol and register the user with the CA and adds the user to the wallet.
    const userData = JSON.stringify({hospitalId: req.body.hospid, userId: req.body.doctorId});
    const registerUserRes = await network.registerUser(userData);
    if (registerUserRes.error) {
      await network.invoke(networkObj, false, 'Admin_deleteDoctor', userData);
      res.send(registerUserRes.error);
    }

    res.status(201).send(getMessage(false, 'Successfully registered Doctor.', req.body.doctorId, req.body.password));
};

/**
 * @param  {Request} req Role in the header
 * @param  {Response} res 200 response with the json of all the assets(patients) in the ledger
 * @description Retrieves all the assets(patients) in the ledger
 */
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
