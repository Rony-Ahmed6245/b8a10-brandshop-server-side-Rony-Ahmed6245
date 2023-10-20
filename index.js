const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



// brands
// ZENCOCsg1VgvvfYA

const uri = "mongodb+srv://brands:ZENCOCsg1VgvvfYA@cluster0.eehyjj4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    


    // database collections 
    const productCollection = client.db("productsDB").collection("products");

    // post add product
    app.post("/products", async (req, res) => {
        const user = req.body;
        //   console.log(user);
        const result = await productCollection.insertOne(user);
        console.log(result);
        res.send(result);
      });

    //   get and read data 
      app.get("/products", async (req, res) => {
        const result = await productCollection.find().toArray();
        res.send(result);
      });
      
// single data 
      app.get('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        console.log(query)
        const result = await productCollection.findOne(query);
        res.send(result)
    })







    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  
  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });