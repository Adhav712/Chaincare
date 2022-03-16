const fs  = require('fs');
const enrollAdmin = require('./controllers/enrollAdmin.js');
const registerUser = require('./controllers/registerUser.js');


async function initpatientLedger() {
    const jsonString = fs.readFileSync('../chaincode/chaincare-contract/lib/initpatientLedger.json');
    const patients = JSON.parse(jsonString);
    let i = 0;
    for(i = 0;i < patients.length; i++){
            const attr = {
                firstName: patients[i].firstName,
                lastName: patients[i].lastName,
                role:'patients',
            }
    await registerUser.enrollRegisterUser('1','PID'+i, JSON.stringify(attr));
    }
}

async function initdoctorLedger(){
    const jsonString = fs.readFileSync('../chaincode/chaincare-contract/lib/initdoctorLedger.json');
    const doctors = JSON.parse(jsonString);
    let i = 0;
    for(i = 0;i < doctors.length; i++){
            const attr = {
                firstName: doctors[i].firstName,
                lastName: doctors[i].lastName,
                role:'doctor',
                Fields: doctors[i].Fields
            }
    await registerUser.enrollRegisterUser('1','DOCTOR'+i, JSON.stringify(attr));
    }

}

async function main(){
    await enrollAdmin.enrollAdminHosp1();
    await enrollAdmin.enrollAdminHosp2();
    await enrollAdmin.enrollAdminHosp3();
    await initpatientLedger();
    await initdoctorLedger();
}

main();