/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {buildCAClient, registerAndEnrollUser} = require('./Utils/CaUtils.js');
const {buildCCPHosp1, buildCCPHosp2, buildWallet, buildCCPHosp3} = require('./Utils/Utils.js');
const walletPath = path.join(__dirname, 'wallet');

let mspOrg;
let adminUserId;
let caClient;



exports.enrollRegisterUser = async function(hospitalId, userId, attributes) {
    try {
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
      hospitalId = parseInt(hospitalId);
  
      if (hospitalId === 1) {
        // build an in memory object with the network configuration (also known as a connection profile)
        const ccp = buildCCPHosp1();
  
        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp1apollo.chaincare.com');
  
        mspOrg = 'hosp1apolloMSP';
        adminUserId = 'hosp1apolloadmin';
      } else if (hospitalId === 2) {
        // build an in memory object with the network configuration (also known as a connection profile)
        const ccp = buildCCPHosp2();
  
        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp2vijaya.chaincare.com');
  
        mspOrg = 'hosp2vijayaMSP';
        adminUserId = 'hosp2vijayaadmin';
      } else if (hospitalId === 3) {
        // build an in memory object with the network configuration (also known as a connection profile)
        const ccp = buildCCPHosp3();
  
        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        caClient = buildCAClient(FabricCAServices, ccp, 'ca.hosp3vijaya.chaincare.com');
  
        mspOrg = 'hosp3stanleyMSP';
        adminUserId = 'hosp3stanleyadmin';
      }
      // enrolls users to Hospital 1 and adds the user to the wallet
      await registerAndEnrollUser(caClient, wallet, mspOrg, userId, adminUserId, attributes);
      console.log('msg: Successfully enrolled user ' + userId + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to register user "${userId}": ${error}`);
      process.exit(1);
    }
  };
  