#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# This script is designed to be run in the cli container as the
# first step of the EYFN tutorial.  It creates and submits a
# configuration transaction to add Ins1starhealth to the test network
#

CHANNEL_NAME="$1"
DELAY="$2"
TIMEOUT="$3"
VERBOSE="$4"
: ${CHANNEL_NAME:="hospitalchannel"}
: ${DELAY:="3"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
COUNTER=1
MAX_RETRY=5


# imports
. scripts/Ins1starhealth-scripts/envVar.sh
. scripts/Ins1starhealth-scripts/configUpdate.sh
. scripts/utils.sh

infoln "Creating config transaction to add Ins1starhealth to network"

# Fetch the config for the channel, writing it to config.json
fetchChannelConfig 3 ${CHANNEL_NAME} config.json

# Modify the configuration to append the new org
set -x
jq -s '.[0] * {"channel_group":{"groups":{"Application":{"groups": {"Ins1starhealthMSP":.[1]}}}}}' config.json ./organizations/peerOrganizations/Ins1starhealth.chaincare.com/Ins1starhealth.json > modified_config.json
{ set +x; } 2>/dev/null

# Compute a config update, based on the differences between config.json and modified_config.json, write it as a transaction to Ins1starhealth_update_in_envelope.pb
createConfigUpdate ${CHANNEL_NAME} config.json modified_config.json Ins1starhealth_update_in_envelope.pb

infoln "Signing config transaction"
signConfigtxAsPeerOrg 3 Ins1starhealth_update_in_envelope.pb

infoln "Submitting transaction from a different peer (peer0.org2) which also signs it"
setGlobals 2
set -x
peer channel update -f Ins1starhealth_update_in_envelope.pb -c ${CHANNEL_NAME} -o orderer.chaincare.com:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA"
{ set +x; } 2>/dev/null

successln "Config transaction to add Ins1starhealth to network submitted"
