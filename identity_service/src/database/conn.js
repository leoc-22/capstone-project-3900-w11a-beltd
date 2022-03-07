const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://w11a-beltd:comp3900-w11a-beltd@cluster0.3myyc.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
  // const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
