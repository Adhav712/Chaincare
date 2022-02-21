cd ..

./network.sh up createChannel -ca -s couchdb
# echo ${PWD}
cd  ./addInsurance
# echo ${PWD}

./addInsurance.sh up -ca -s couchdb

