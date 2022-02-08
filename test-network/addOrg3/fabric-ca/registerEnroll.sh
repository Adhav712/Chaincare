#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

function createOrg3 {
	infoln "Enrolling the CA admin"
	mkdir -p ../organizations/peerOrganizations/hosp3stanley.chaincare.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:11054 --caname ca-hosp3stanley --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hosp3stanley.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hosp3stanley.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hosp3stanley.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hosp3stanley.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/msp/config.yaml"

	infoln "Registering peer0"
  set -x
	fabric-ca-client register --caname ca-hosp3stanley --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-hosp3stanley --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-hosp3stanley --id.name org3admin --id.secret org3adminpw --id.type admin --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-hosp3stanley -M "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/msp" --csr.hosts peer0.hosp3stanley.chaincare.com --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/msp/config.yaml" "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-hosp3stanley -M "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls" --enrollment.profile tls --csr.hosts peer0.hosp3stanley.chaincare.com --csr.hosts localhost --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null


  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/tlscacerts/"* "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/ca.crt"
  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/signcerts/"* "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/server.crt"
  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/keystore/"* "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/server.key"

  mkdir "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/msp/tlscacerts"
  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/tlscacerts/"* "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/msp/tlscacerts/ca.crt"

  mkdir "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/tlsca"
  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/tls/tlscacerts/"* "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/tlsca/tlsca.hosp3stanley.chaincare.com-cert.pem"

  mkdir "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/ca"
  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/peers/peer0.hosp3stanley.chaincare.com/msp/cacerts/"* "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/ca/ca.hosp3stanley.chaincare.com-cert.pem"

  infoln "Generating the user msp"
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:11054 --caname ca-hosp3stanley -M "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/users/User1@hosp3stanley.chaincare.com/msp" --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/msp/config.yaml" "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/users/User1@hosp3stanley.chaincare.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
	fabric-ca-client enroll -u https://org3admin:org3adminpw@localhost:11054 --caname ca-hosp3stanley -M "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/users/Admin@hosp3stanley.chaincare.com/msp" --tls.certfiles "${PWD}/fabric-ca/hosp3stanley/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/msp/config.yaml" "${PWD}/../organizations/peerOrganizations/hosp3stanley.chaincare.com/users/Admin@hosp3stanley.chaincare.com/msp/config.yaml"
}
