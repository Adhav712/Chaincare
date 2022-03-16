/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const {buildCAClient, registerAndEnrollUser} = require('./Utils/CaUtils.js');
const {buildCCPHosp1, buildCCPHosp2, buildWallet, buildCCPHosp3} = require('./Utils/Utils.js');
const walletPath = path.join(__dirname, 'wallet');

const adminHospital1 = 'hosp1apolloadmin';
const adminHospital1Passwd = 'hosp1apollochaincare';
const mspHosp1 = 'hosp1apolloMSP';

const adminHospital2 = 'hosp2vijayaadmin';
const adminHospital2Passwd = 'hosp2vijayachaincare';
const mspHosp2 = 'hosp2vijayaMSP';

const adminHospital3 = 'hosp1apolloadmin';
const adminHospital3Passwd = 'hosp1apollochaincare';
const mspHosp3 = 'hosp3stanleyMSP';

exports.enrollAdminHosp1 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPHosp1();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp1apollo.chaincare.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, mspHosp1, adminHospital1, adminHospital1Passwd);
  
      console.log('msg: Successfully enrolled admin user ' + adminHospital1 + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${adminHospital1} + : ${error}`);
      process.exit(1);
    }
  };

  exports.enrollAdminHosp2 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPHosp2();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp2apollo.chaincare.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, mspHosp2, adminHospital2, adminHospital2Passwd);
  
      console.log('msg: Successfully enrolled admin user ' + adminHospital2 + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${adminHospital2} + : ${error}`);
      process.exit(1);
    }
  }; 

  exports.enrollAdminHosp3 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPHosp3();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp3stanley.chaincare.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, mspHosp3, adminHospital3, adminHospital3Passwd);
  
      console.log('msg: Successfully enrolled admin user ' + adminHospital3 + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${adminHospital3} + : ${error}`);
      process.exit(1);
    }
  };

// async function main(){
//     try {
//         // load the network configuration
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'hosp1apollo.chaincare.com', 'connection-hosp1apollo.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//         // Create a new CA client for interacting with the CA.
//         const caInfo = ccp.certificateAuthorities['ca.hosp1apollo.chaincare.com'];
//         const caTLSCACerts = caInfo.tlsCACerts.pem;
//         const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(),'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the admin user.
//         const identity = await wallet.get('admin');
//         if (identity) {
//             console.log('An identity for the admin user "admin" already exists in the wallet');
//             return;
//         }

//         // Enroll the admin user, and import the new identity into the wallet.
//         const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
//         const x509Identity = {
//             credentials: {
//                 certificate: enrollment.certificate,
//                 privateKey: enrollment.key.toBytes(),
//             },
//             mspId: 'hosp1apolloMSP',
//             type: 'X.509',
//         };
//         await wallet.put('admin', x509Identity);
//         console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

//     } catch (error) {
//         console.error(`Failed to enroll admin user "admin": ${error}`);
//         process.exit(1);
//     }
// }



// main()