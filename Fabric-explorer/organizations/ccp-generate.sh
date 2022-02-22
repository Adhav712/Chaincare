#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=1apollo
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/hosp1apollo.chaincare.com/tlsca/tlsca.hosp1apollo.chaincare.com-cert.pem
CAPEM=organizations/peerOrganizations/hosp1apollo.chaincare.com/ca/ca.hosp1apollo.chaincare.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hosp1apollo.chaincare.com/connection-hosp1apollo.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hosp1apollo.chaincare.com/connection-hosp1apollo.yaml

ORG=2vijaya
P0PORT=9051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/hosp2vijaya.chaincare.com/tlsca/tlsca.hosp2vijaya.chaincare.com-cert.pem
CAPEM=organizations/peerOrganizations/hosp2vijaya.chaincare.com/ca/ca.hosp2vijaya.chaincare.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hosp2vijaya.chaincare.com/connection-hosp2vijaya.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hosp2vijaya.chaincare.com/connection-hosp2vijaya.yaml
