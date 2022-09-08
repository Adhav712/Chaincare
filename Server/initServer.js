const fs  = require('fs');
const enrollAdmin = require('./controllers/enrollAdmin.js');
const registerUser = require('./controllers/registerUser.js');
const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const path = require('path');


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

async function enrollInsurance1AdminUser(){
 

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'Ins1starhealth.chaincare.com', 'connection-Ins1starhealth.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.Ins1starhealth.chaincare.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/controllers/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get('Insurance1AdminUser');
        if (userIdentity) {
            console.log('An identity for the user "appUser" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('Ins1starhealthadmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'Ins1starhealthadmin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: 'Insurance1AdminUser',
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'Insurance1AdminUser',
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Ins1starhealthMSP',
            type: 'X.509',
        };
        await wallet.put('appUser', x509Identity);
        console.log('Successfully registered and enrolled admin user "appUser" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "appUser": ${error}`);
        process.exit(1);
    }


}

async function main(){
    await enrollAdmin.enrollAdminHosp1();
    await enrollAdmin.enrollAdminHosp2();
    await enrollAdmin.enrollAdminHosp3();
    await enrollAdmin.enrollAdminIns1();
    await enrollInsurance1AdminUser();
    await initpatientLedger();
    await initdoctorLedger();
}

main();