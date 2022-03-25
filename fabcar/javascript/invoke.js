/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'Ins1starhealth.chaincare.com', 'connection-Ins1starhealth.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('Ins1starhealthadmin');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'Ins1starhealthadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('chaincare');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
         //await contract.submitTransaction('Admin_createPatient', "PID7", "harish@gmail.com", "Harish", "ragavendhiran", "12424", "21", "9768525821");
         await contract.submitTransaction('Admin_deletePatient', "PID7");
        
        //Admin create patient
        // await contract.submitTransaction('Admin_createPatient', 'PID6', 'Aakash', 'S', 'director', '20' , '9185218268');
        console.log('Transaction has been submitted');

        //patient update details
        // await contract.submitTransaction('Patient_updatePatient','PID6','','','director','','patient','','78284884989','Manali Kosappur Rd, Mathur, Tamil Nadu 600051','Rashes');
        // console.log('Transcation has been submitted');


        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

