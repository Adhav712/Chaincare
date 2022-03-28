#!/bin/bash

source ../scripts/utils.sh


CC_SRC_LANGUAGE="go"
CC_SRC_PATH="../../chaincode/chaincare-private/chaincode-go"

# /deployCC.sh -ccn private -ccp ../../chaincode/chaincare-private/chaincode-go -ccl go 
# -ccep "OR('hosp1apolloMSP.peer','Ins1starhealthMSP.peer')" -cccg ../../chaincode/chaincare-private/chaincode-go/collections_config.json

CHANNEL_NAME=${1:-"hospitalchannel"}
CC_NAME=${2:-"private"}
CC_SRC_PATH=${3:-"../../chaincode/chaincare-private/chaincode-go"}
CC_SRC_LANGUAGE=${4:-"go"}
CC_VERSION=${5:-"1.0"}
CC_SEQUENCE=${6:-"1"}
CC_INIT_FCN=${7:-"NA"}
CC_END_POLICY=${8:-"OR('hosp1apolloMSP.peer','Ins1starhealthMSP.peer')"}
CC_COLL_CONFIG=${9:-"../../chaincode/chaincare-private/chaincode-go/collections_config.json"}
DELAY=${10:-"3"}
MAX_RETRY=${11:-"5"}
VERBOSE=${12:-"true"}

println "executing with the following"
println "- CHANNEL_NAME: ${C_GREEN}${CHANNEL_NAME}${C_RESET}"
println "- CC_NAME: ${C_GREEN}${CC_NAME}${C_RESET}"
println "- CC_SRC_PATH: ${C_GREEN}${CC_SRC_PATH}${C_RESET}"
println "- CC_SRC_LANGUAGE: ${C_GREEN}${CC_SRC_LANGUAGE}${C_RESET}"
println "- CC_VERSION: ${C_GREEN}${CC_VERSION}${C_RESET}"
println "- CC_SEQUENCE: ${C_GREEN}${CC_SEQUENCE}${C_RESET}"
println "- CC_END_POLICY: ${C_GREEN}${CC_END_POLICY}${C_RESET}"
println "- CC_COLL_CONFIG: ${C_GREEN}${CC_COLL_CONFIG}${C_RESET}"
println "- CC_INIT_FCN: ${C_GREEN}${CC_INIT_FCN}${C_RESET}"
println "- DELAY: ${C_GREEN}${DELAY}${C_RESET}"
println "- MAX_RETRY: ${C_GREEN}${MAX_RETRY}${C_RESET}"
println "- VERBOSE: ${C_GREEN}${VERBOSE}${C_RESET}"

export FABRIC_CFG_PATH=$PWD/../../config/
export PATH=${PWD}/../../bin:$PATH

CC_SRC_LANGUAGE=$(echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:])

# do some language specific preparation to the chaincode before packaging
if [ "$CC_SRC_LANGUAGE" = "go" ]; then
  CC_RUNTIME_LANGUAGE=golang

  infoln "Vendoring Go dependencies at $CC_SRC_PATH"
  pushd $CC_SRC_PATH
  GO111MODULE=on go mod vendor
  popd
  successln "Finished vendoring Go dependencies"

else
  fatalln "The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script. Supported chaincode languages are: go, java, javascript, and typescript"
  exit 1
fi

INIT_REQUIRED="--init-required"
# check if the init fcn should be called
if [ "$CC_INIT_FCN" = "NA" ]; then
  INIT_REQUIRED=""
fi

if [ "$CC_END_POLICY" = "NA" ]; then
  CC_END_POLICY=""
else
  CC_END_POLICY="--signature-policy $CC_END_POLICY"
fi

if [ "$CC_COLL_CONFIG" = "NA" ]; then
  CC_COLL_CONFIG=""
else
  CC_COLL_CONFIG="--collections-config $CC_COLL_CONFIG"
fi

# import utils
# . ../scripts/Ins1Ins1starhealth-scripts/envVar.sh
setEnvr(){
  if [ $1 -eq 1 ]; then
  export CORE_PEER_TLS_ENABLED=true
  export CORE_PEER_LOCALMSPID="hosp1apolloMSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/../organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/ca.crt
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp
  export CORE_PEER_ADDRESS=localhost:7051
  export ORG=hosp1apollo
else
  export CORE_PEER_TLS_ENABLED=true
  export CORE_PEER_LOCALMSPID="Ins1starhealthMSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/ca.crt
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp
  export CORE_PEER_ADDRESS=localhost:12051
  export ORG=Ins1starhealth
fi 


export ORDERER_CA=${PWD}/../organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem
export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/../organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/../organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.key

}


setEnvr 2

# installChaincode PEER ORG
echo 1 ----Packaging chaincode----
peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION}

echo 2 ----installing Chaincode----
peer lifecycle chaincode install ${CC_NAME}.tar.gz

echo 3 ----chaincode queryed----
peer lifecycle chaincode queryinstalled


export CC_PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
echo ${CC_PACKAGE_ID} 

echo 4 ----aprroving chaincode----
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" --channelID ${CHANNEL_NAME} --name ${CC_NAME} --version ${CC_VERSION} --package-id private_1.0:3f2d3a9645888a266923b904a8c6d266735b8ae00f6cb87a15f68a6e4debc6aa --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG}


echo 5 ----chaincode querycommitted----
peer lifecycle chaincode querycommitted --channelID ${CHANNEL_NAME} --name ${CC_NAME} --cafile "$ORDERER_CA" 

export BILL_PROPERTIES=$(echo -n "{\"ID\":\"PID0\",\"name\":\"Patient anme\",\"billamount\":\"20\",\"publicDesc\":\"Provide insurance\"}" | base64 | tr -d \\n)

echo 6 ----chaincode invoke-----
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" -C ${CHANNEL_NAME} -n ${CC_NAME} --peerAddresses ${CORE_PEER_ADDRESS} --tlsRootCertFiles ${CORE_PEER_TLS_ROOTCERT_FILE} -c '{"function":"CreateBill","Args":[]}' --transient "{\"bill_properties\":\"$BILL_PROPERTIES\"}"


echo 7 ----chaincode query public data----
peer chaincode query -C ${CHANNEL_NAME} -n ${CC_NAME} -c '{"function":"ReadBill","Args":["PID1"]}'

echo 8 ----chaincode query Private data----
peer chaincode query -C ${CHANNEL_NAME} -n ${CC_NAME} -c '{"function":"ReadOrg1BillPrivateDetails","Args":["PID1"]}'

# packageChaincode() {
#   set -x
#   peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION} >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   verifyResult $res "Chaincode packaging has failed"
#   successln "Chaincode is packaged"
# }

# # installChaincode PEER ORG
# installChaincode() {
#   set -x
#   peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   verifyResult $res "Chaincode installation on peer0.org${ORG} has failed"
#   successln "Chaincode is installed on peer0.org${ORG}"
# }

# # queryInstalled PEER ORG
# queryInstalled() {
#   set -x
#   peer lifecycle chaincode queryinstalled >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
#   verifyResult $res "Query installed on peer0.org${ORG} has failed"
#   successln "Query installed successful on peer0.org${ORG} on channel"
# }

# # approveForMyOrg VERSION PEER ORG
# approveForMyOrg() {

#   set -x
#   peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG} >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   verifyResult $res "Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
#   successln "Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME'"
# }

# # checkCommitReadiness VERSION PEER ORG
# checkCommitReadiness() {
  
#   infoln "Checking the commit readiness of the chaincode definition on peer0.org${ORG} on channel '$CHANNEL_NAME'..."
#   peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG} --output json >&log.txt

# commitChaincodeDefinition() {
 
#   verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "

#   set -x
#   peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" --channelID $CHANNEL_NAME --name ${CC_NAME} "${PEER_CONN_PARMS[@]}" --version ${CC_VERSION} --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG} >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   verifyResult $res "Chaincode definition commit failed on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
#   successln "Chaincode definition committed on channel '$CHANNEL_NAME'"
# }

# # queryCommitted ORG
# queryCommitted() {
  
#   EXPECTED_RESULT="Version: ${CC_VERSION}, Sequence: ${CC_SEQUENCE}, Endorsement Plugin: escc, Validation Plugin: vscc"
#   infoln "Querying chaincode definition on peer0.org${ORG} on channel '$CHANNEL_NAME'..."
#   peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME} >&log.txt
 
# }

# chaincodeInvokeInit() {
  
#   verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "

#   set -x
#   export BILL_PROPERTIES=$(echo -n "{\"ID\":\"PID0\",\"name\":\"Patient anme\",\"billamount\":\"20\",\"publicDesc\":\"Provide insurance\"}" | base64 | tr -d \\n)
#   fcn_call='{"function":"CreateBill","Args":[]}' --transient "{\"bill_properties\":\"$BILL_PROPERTIES\"}"
#   infoln "invoke fcn call:${fcn_call}"
#   peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses $CORE_PEER_ADDRESS  --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE --isInit -c '{"function":"CreateBill","Args":[]}' --transient "{\"bill_properties\":\"$BILL_PROPERTIES\"}" >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   verifyResult $res "Invoke execution on $PEERS failed "
#   successln "Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME'"
# }

# chaincodeQuery() {
 
#   infoln "Querying on peer0.org${ORG} on channel '$CHANNEL_NAME'..."
#   peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"ReadBill","Args":["PID0"]}' >&log.txt
 
# }


# setEnvr 1

# ## package the chaincode
# packageChaincode

# ## Install chaincode on peer0.hosp1 and peer0.hosp2
# infoln "Installing chaincode on peer0.hosp1..."
# installChaincode 1

# setEnvr 2
# infoln "Install chaincode on peer0.hosp2..."
# installChaincode 2

# setEnvr 1
# ## query whether the chaincode is installed
# queryInstalled 1

# ## approve the definition for hosp1
# approveForMyOrg 1

# ## check whether the chaincode definition is ready to be committed
# ## expect hosp1 to have approved and hosp2 not to
# checkCommitReadiness 1 "\"hosp1apolloMSP\": true" "\"Ins1starhealth\": false"

# setEnvr 2
# checkCommitReadiness 2 "\"hosp1apolloMSP\": true" "\"hosp2vijayaMSP\": true" 

# ## now approve also for hosp2
# approveForMyOrg 2

# ## check whether the chaincode definition is ready to be committed
# ## expect them both to have approved
# setEnvr 1
# checkCommitReadiness 1 "\"hosp1apolloMSP\": true" "\"hosp2vijayaMSP\": true"  
# echo "===================== Query Installed on peer0.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
# setEnvr 2
# checkCommitReadiness 2 "\"hosp1apolloMSP\": true" "\"hosp2vijayaMSP\": true" 
# echo "===================== Query Installed on peer0.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "

# ## now that we know for sure both orgs have approved, commit the definition
# setEnvr 1
# commitChaincodeDefinition 1
# echo "===================== Query Installed on peer0.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
# setEnvr 2
# commitChaincodeDefinition 2


# ## query on both orgs to see that the definition committed successfully
# setEnvr 1
# queryCommitted 1
# setEnvr 2
# queryCommitted 2

#  setEnvr 1
#   chaincodeInvokeInit 1 
#   setEnvr 2
#   chaincodeInvokeInit 2

# ## Invoke the chaincode - this does require that the chaincode have the 'initLedger'
# ## method defined
# # if [ "$CC_INIT_FCN" = "NA" ]; then
# #   infoln "Chaincode initialization is not required"
# # else
 
# # fi

# exit 0

