const {test,expect}=require('@playwright/test');
const {MongoClient}=require('mongodb');

const dbName='admin';
const url='mongodb://core:core@hy1ic1rcom001.ivycomptech.co.in:27017/coredb';

let client;

async function connectToMongo(){
    if(!client){
        client=new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
    }
    return client.db(dbName);

}
async function closeMongo() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = { connectToMongo, closeMongo };