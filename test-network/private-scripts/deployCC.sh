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

# packageChaincode() {
#   set -x
#   peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION} >&log.txt
#   res=$?
#   { set +x; } 2>/dev/null
#   cat log.txt
#   verifyResult $res "Chaincode packaging has failed"
#   successln "Chaincode is packaged"
# }
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Ins1starhealthMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp
export CORE_PEER_ADDRESS=localhost:12051

export ORDERER_CA=${PWD}/../organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem
export PEER0_Ins1starhealth_CA=${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/ca.crt
export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/../organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/../organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.key


# # installChaincode PEER ORG
# echo 1 ----Packaging chaincode----
# peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION}

# echo 2 ----installing Chaincode----
# peer lifecycle chaincode install ${CC_NAME}.tar.gz

# echo 3 ----chaincode queryed----
# peer lifecycle chaincode queryinstalled


# export CC_PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
# echo ${CC_PACKAGE_ID} 

# echo 4 ----aprroving chaincode----
# peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" --channelID ${CHANNEL_NAME} --name ${CC_NAME} --version ${CC_VERSION} --package-id private_1.0:7c7a9a78562870eb469968861a2576c79cccb75ab4f0c63346e169c384b12d9d --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG}


# echo 5 ----chaincode querycommitted----
# peer lifecycle chaincode querycommitted --channelID ${CHANNEL_NAME} --name ${CC_NAME} --cafile "$ORDERER_CA" 

# export BILL_PROPERTIES=$(echo -n "{\"ID\":\"PID0\",\"name\":\"Patient anme\",\"billamount\":\"20\",\"publicDesc\":\"Provide insurance\"}" | base64 | tr -d \\n)

# echo 6 ----chaincode invoke-----
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.chaincare.com --tls --cafile "$ORDERER_CA" -C ${CHANNEL_NAME} -n ${CC_NAME} --peerAddresses localhost:12051 --tlsRootCertFiles ${CORE_PEER_TLS_ROOTCERT_FILE} -c '{"function":"CreateBill","Args":[]}' --transient "{\"bill_properties\":\"$BILL_PROPERTIES\"}"


echo 7 ----chaincode query public data----
peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadBill","Args":["PID0"]}'

echo 8 ----chaincode query Private data----
peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadOrg1BillPrivateDetails","Args":["PID0"]}'