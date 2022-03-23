cd addInsurance/
#allways first remove some thing from Insurane and then up the network
./addInsurance.sh down

cd ../

# echo ${PWD}
./network.sh up createChannel -ca -s couchdb

cd ./addOrg3
# echo ${PWD}

./addOrg3.sh up -ca -s couchdb

cd ../addInsurance
# echo ${PWD}

./addInsurance.sh up -ca -s couchdb

cd .. 
# echo ${PWD}

./network.sh deployCC -ccn chaincare -ccv 1 -cci initLedger -ccl javascript -ccp ../chaincode/chaincare-contract

cd ./scripts/Ins1starhealth-scripts
# echo ${PWD}

./deployCC.sh




# cd ..

# ./network.sh up createChannel -ca -s couchdb
# echo ${PWD}
# cd  ./addInsurance
# echo ${PWD}

# ./addInsurance.sh up -ca -s couchdb

