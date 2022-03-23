#!/bin/bash

function createHosp1() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/hosp1apollo.chaincare.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/

  set -x
  fabric-ca-client enroll -u https://hosp1apolloadmin:hosp1apollochaincare@localhost:7054 --caname ca-hosp1apollo --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hosp1apollo.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hosp1apollo.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hosp1apollo.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hosp1apollo.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/config.yaml"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-hosp1apollo --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-hosp1apollo --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the hosp admin"
  set -x
  fabric-ca-client register --caname ca-hosp1apollo --id.name hosp1hosp1apolloadmin --id.secret hosp1apollochaincare --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-hosp1apollo -M "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/msp" --csr.hosts peer0.hosp1apollo.chaincare.com --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-hosp1apollo -M "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls" --enrollment.profile tls --csr.hosts peer0.hosp1apollo.chaincare.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/server.key"

  mkdir -p "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/tlscacerts"
  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/tlscacerts/ca.crt"

  mkdir -p "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/tlsca"
  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/tlsca/tlsca.hosp1apollo.chaincare.com-cert.pem"

  mkdir -p "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/ca"
  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/peers/peer0.hosp1apollo.chaincare.com/msp/cacerts/"* "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/ca/ca.hosp1apollo.chaincare.com-cert.pem"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-hosp1apollo -M "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/User1@hosp1apollo.chaincare.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/User1@hosp1apollo.chaincare.com/msp/config.yaml"

  infoln "Generating the hosp admin msp"
  set -x
  fabric-ca-client enroll -u https://hosp1hosp1apolloadmin:hosp1apollochaincare@localhost:7054 --caname ca-hosp1apollo -M "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/hosp1apollo/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/hosp1apollo.chaincare.com/users/Admin@hosp1apollo.chaincare.com/msp/config.yaml"
}

function createHosp2() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/hosp2vijaya.chaincare.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/

  set -x
  fabric-ca-client enroll -u https://hosp2vijayaadmin:hosp2vijayachaincare@localhost:8054 --caname ca-hosp2vijaya --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hosp2vijaya.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hosp2vijaya.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hosp2vijaya.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hosp2vijaya.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/msp/config.yaml"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-hosp2vijaya --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-hosp2vijaya --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the hosp admin"
  set -x
  fabric-ca-client register --caname ca-hosp2vijaya --id.name hosp2hosp2vijayaadmin --id.secret hosp2vijayachaincare --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-hosp2vijaya -M "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/msp" --csr.hosts peer0.hosp2vijaya.chaincare.com --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-hosp2vijaya -M "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls" --enrollment.profile tls --csr.hosts peer0.hosp2vijaya.chaincare.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/server.key"

  mkdir -p "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/msp/tlscacerts"
  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/msp/tlscacerts/ca.crt"

  mkdir -p "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/tlsca"
  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/tlsca/tlsca.hosp2vijaya.chaincare.com-cert.pem"

  mkdir -p "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/ca"
  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/peers/peer0.hosp2vijaya.chaincare.com/msp/cacerts/"* "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/ca/ca.hosp2vijaya.chaincare.com-cert.pem"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-hosp2vijaya -M "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/users/User1@hosp2vijaya.chaincare.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/users/User1@hosp2vijaya.chaincare.com/msp/config.yaml"

  infoln "Generating the hosp admin msp"
  set -x
  fabric-ca-client enroll -u https://hosp2hosp2vijayaadmin:hosp2vijayachaincare@localhost:8054 --caname ca-hosp2vijaya -M "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/users/Admin@hosp2vijaya.chaincare.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/hosp2vijaya/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/hosp2vijaya.chaincare.com/users/Admin@hosp2vijaya.chaincare.com/msp/config.yaml"
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/chaincare.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/chaincare.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/chaincare.com/msp/config.yaml"

  infoln "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp" --csr.hosts orderer.chaincare.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/config.yaml"

  infoln "Generating the orderer-tls certificates"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls" --enrollment.profile tls --csr.hosts orderer.chaincare.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/server.key"

  mkdir -p "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem"

  mkdir -p "${PWD}/organizations/ordererOrganizations/chaincare.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/orderers/orderer.chaincare.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/chaincare.com/msp/tlscacerts/tlsca.chaincare.com-cert.pem"

  infoln "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/chaincare.com/users/Admin@chaincare.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/chaincare.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/chaincare.com/users/Admin@chaincare.com/msp/config.yaml"
}
