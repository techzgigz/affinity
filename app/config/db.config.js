module.exports = {
  HOST: "first:p@ssw0rd@cluster0.duhzp.mongodb.net",
  PORT: 27017,
  DB: "myFirstDatabase",
  HOST2:'mongodb+srv://first:p@ssw0rd@cluster0.duhzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
};

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://first:<password>@cluster0.duhzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });