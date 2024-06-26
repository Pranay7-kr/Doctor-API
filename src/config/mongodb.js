import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/hospital";
let client;

export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
    .then(clientInstance =>{
        client = clientInstance;
        console.log("MongoDB is Connected");
    })
    .catch(err=>{
        console.log(err);
    });
}

export const getDB = ()=>{
    return client.db();
}