


// Get all collections for user
app.get("/myCollections", async (req, res) => {
  const collections = await.collectionModel.find({}); // find by session/userid???

  try {
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new collection
app.post("/collection", async (req, res) => {
  const collection = new collectionModel({
    user: req.body.u_id,
    name = req.body.name,
    status = req.body.status,
  });

  try {
    await collection.save();
    res.send(collection);
    console.log("Collection created");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add book to collection

// Remove book to collection

module.exports = app;

