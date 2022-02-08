#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem
export PEER0_hosp1apollo_CA=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/ca.crt
export PEER0_hosp2vijaya_CA=${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/ca.crt
export PEER0_hosp3stanley_CA=${PWD}/organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/ca.crt
export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.key

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  infoln "Using organization ${USING_ORG}"
  if [ $USING_ORG -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="hosp1apolloMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_hosp1apollo_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
  elif [ $USING_ORG -eq 2 ]; then
    export CORE_PEER_LOCALMSPID="hosp2vijayaMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_hosp2vijaya_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/users/Admin@hosp2vijaya.chaincare.com/msp
    export CORE_PEER_ADDRESS=localhost:9051

  elif [ $USING_ORG -eq 3 ]; then
    export CORE_PEER_LOCALMSPID="hosp3stanleyMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_hosp3stanley_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/hosp3stanley.chaincare.com/users/Admin@hosp3stanley.chaincare.com/msp
    export CORE_PEER_ADDRESS=localhost:11051
  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container 
setGlobalsCLI() {
  setGlobals $1

  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  if [ $USING_ORG -eq 1 ]; then
    export CORE_PEER_ADDRESS=peer0.hosp1apollo.chaincare.com:7051
  elif [ $USING_ORG -eq 2 ]; then
    export CORE_PEER_ADDRESS=peer0.hosp2vijaya.chaincare.com:9051
  elif [ $USING_ORG -eq 3 ]; then
    export CORE_PEER_ADDRESS=peer0.hosp3stanley.chaincare.com:11051
  else
    errorln "ORG Unknown"
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=()
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    PEER="peer0.hosp$1"
    ## Set peer addresses
    if [ -z "$PEERS" ]
    then
	PEERS="$PEER"
    else
	PEERS="$PEERS $PEER"
    fi
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" --peerAddresses $CORE_PEER_ADDRESS)
    ## Set path to TLS certificate
    CA=PEER0_hosp$1_CA
    TLSINFO=(--tlsRootCertFiles "${!CA}")
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" "${TLSINFO[@]}")
    # shift by one to get to the next organization
    shift
  done
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
