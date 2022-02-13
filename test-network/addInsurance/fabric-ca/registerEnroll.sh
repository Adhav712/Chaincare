#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

function createIns {
	infoln "Enrolling the CA admin"
	mkdir -p ../organizations/peerOrganizations/Ins1starhealth.chaincare.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:12054 --caname ca-Ins1starhealth --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-Ins1starhealth.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-Ins1starhealth.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-Ins1starhealth.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-Ins1starhealth.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/config.yaml"

	infoln "Registering peer0"
  set -x
	fabric-ca-client register --caname ca-Ins1starhealth --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-Ins1starhealth --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-Ins1starhealth --id.name Ins1admin --id.secret Ins1adminpw --id.type admin --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:12054 --caname ca-Ins1starhealth -M "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/msp" --csr.hosts peer0.Ins1starhealth.chaincare.com --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/config.yaml" "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:12054 --caname ca-Ins1starhealth -M "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls" --enrollment.profile tls --csr.hosts peer0.Ins1starhealth.chaincare.com --csr.hosts localhost --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null


  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/tlscacerts/"* "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/ca.crt"
  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/signcerts/"* "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/server.crt"
  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/keystore/"* "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/server.key"

  mkdir "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/tlscacerts"
  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/tlscacerts/"* "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/tlscacerts/ca.crt"

  mkdir "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/tlsca"
  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/tls/tlscacerts/"* "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/tlsca/tlsca.Ins1starhealth.chaincare.com-cert.pem"

  mkdir "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/ca"
  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/peers/peer0.Ins1starhealth.chaincare.com/msp/cacerts/"* "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/ca/ca.Ins1starhealth.chaincare.com-cert.pem"

  infoln "Generating the user msp"
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:12054 --caname ca-Ins1starhealth -M "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/User1@Ins1starhealth.chaincare.com/msp" --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/config.yaml" "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/User1@Ins1starhealth.chaincare.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
	fabric-ca-client enroll -u https://Ins1admin:Ins1adminpw@localhost:12054 --caname ca-Ins1starhealth -M "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp" --tls.certfiles "${PWD}/fabric-ca/Ins1starhealth/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/msp/config.yaml" "${PWD}/../organizations/peerOrganizations/Ins1starhealth.chaincare.com/users/Admin@Ins1starhealth.chaincare.com/msp/config.yaml"
}
