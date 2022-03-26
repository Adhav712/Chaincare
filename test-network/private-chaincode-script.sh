./network.sh down

./network.sh up createChannel -ca -s couchdb

*Deploy Chainode*

./network.sh deployCC -ccn private -ccp ../chaincode/chaincare-private/chaincode-go -ccl go -ccep "OR('hosp1apolloMSP.peer','Ins1starhealthMSP.peer')" -cccg ../chaincode/chaincare-private/chaincode-go/collections_config.json

*Register Identites*

export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

*Adding admin*

export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/

fabric-ca-client register --caname ca-hosp1apollo --id.name hosp1hosp1apolloadmin --id.secret hosp1apollochaincare --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem

fabric-ca-client enroll -u [https://hosp1apolloadmin:hosp1apollochaincare@localhost:7054](https://hosp1apolloadmin:hosp1apollochaincare@localhost:7054/) --caname ca-hosp1apollo -M ${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem

cp ${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp/config.yaml

*Adding Ins*

export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/Ins1starhealth.chaincare.com/

fabric-ca-client register --caname ca-Ins1starhealth --id.name Ins1Ins1starhealthadmin --id.secret Ins1starhealthchaincare --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/Ins1starhealth/tls-cert.pem

fabric-ca-client enroll -u [https://Ins1Ins1starhealthadmin:Ins1starhealthchaincare@localhost:8054](https://Ins1Ins1starhealthadmin:Ins1starhealthchaincare@localhost:8054/) --caname ca-Ins1starhealth -M ${PWD}/organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/Ins1starhealth/tls-cert.pem

cp ${PWD}/organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp/config.yaml

*AS Org1(Admin)*

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="hosp1apolloMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp
export CORE_PEER_ADDRESS=localhost:7051

*Export Create bill Properties*

export BILL_PROPERTIES=$(echo -n "{\"ID\":\"PID0\",\"name\":\"Patient anme\",\"billamount\":\"20\",\"publicDesc\":\"Provide insurance\"}" | base64 | tr -d \\n)

*Invoke createBill function*

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride [orderer.chaincare.com](http://orderer.chaincare.com/) --tls --cafile 
"${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem" -C hospitalchannel 
-n private -c '{"function":"CreateBill","Args":[]}' --transient "{\"bill_properties\":\"$BILL_PROPERTIES\"}"

*Read Public details* 

peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadBill","Args":["PID0"]}'

*Read Org1 Private details*

peer chaincode query -C hospitalchannel -n private -c '{"function":"hosp1apolloMSPPrivateCollection","Args":["PID0"]}'

*As Ins1starhealth(Insurance)*

export CORE_PEER_LOCALMSPID="Ins1starhealthMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/ca.crt

export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp

export CORE_PEER_ADDRESS=localhost:12051

*Insurance quering patient public details*

peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadBill","Args":["PID0"]}'

*Insurance quering Org1 private details to know the bill amount*

peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadOrg1BillPrivateDetails","Args":["PID0"]}'

*Ins Update the Public desription*

*Export update bill properties*

export BILL_PROPERTIES=$(echo -n "{\"ID\":\"PID0\",\"name\":\"green\",\"billamount\":\"100\",\"publicDesc\":\"Bill paid and receipt has been added\"}" | base64 | tr -d \\n)

*Invoke update bill function*

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride [orderer.chaincare.com](http://orderer.chaincare.com/) --tls --cafile 
"${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem" 
-C hospitalchannel -n private -c '{"function":"UpdateBill","Args":[]}' --transient "{\"bill_properties\":\"$BILL_PROPERTIES\"}"

*Read Org2 Private details (To see Updated bill status)*

peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadOrg2BillPrivateDetails","Args":["PID0"]}'

*As org 1*

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="hosp1apolloMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp
export CORE_PEER_ADDRESS=localhost:7051

*Org1 will querry to see the insurance added deatails* 

*Read Public details* 

peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadBill","Args":["PID0"]}'

*Read Org2 Private details (Admin will query this functon to see the insurance paid bill receipt)*

peer chaincode query -C hospitalchannel -n private -c '{"function":"ReadOrg2BillPrivateDetails","Args":["PID0"]}'