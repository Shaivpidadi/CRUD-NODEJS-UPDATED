const MongoClient = require('mongodb').MongoClient;

const connectDB = 'mongodb://localhost:27017';
const dbName = 'mytestingdb';

    async function connectToDB() {
    let client = await MongoClient.connect(connectDB);
    return client.db(dbName);
}

function getUserData(db) {
    return db.collection('customers').find({}).toArray();
}

function insertUserData(db, customerData) {
    return db.collection('customers').insertOne(customerData);
}

function checkData(db,oldName) {
    return db.collection('customers').findOne({name:oldName});
}

function updateUserData(db,oldName,newName) {
    return db.collection('customers').updateOne({name:oldName}, {$set:{name:newName}});
}

function deleteUserData(db,name) {
    return db.collection('customers').deleteOne({name:name});
}


module.exports = {
    getUserData,
    insertUserData,
    checkData,
    updateUserData,
    deleteUserData,
    connectToDB
}