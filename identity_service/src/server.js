const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? 8000 : 8001
const uri = "mongodb+srv://w11a-beltd:comp3900-w11a-beltd@cluster0.3myyc.mongodb.net/Cluster0?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) return console.error(err);
    console.log('Connected to Database');
    const collection = client.db("test").collection("testCollection");

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.post('/users', (req, res) => {
        collection.insertOne(req.body).then(result => {
            res.redirect('/');
        })
            .catch(error => console.error(error))
    })

    app.put('/users', (req, res) => {
        collection.findOneAndUpdate(
            { name: 'John' },
            { $set: { name: req.body.name } }
        )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))
    })

    app.delete('/users', (req, res) => {
        collection.deleteOne(
            { name: req.body.name }
        ).then(result => {
            if (result.deletedCount === 0) {
                return res.json('No user to delete');
            }
            res.json('User deleted')
        })
            .catch(error => console.error(error))
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
});

