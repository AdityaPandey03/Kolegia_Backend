const router = require("express").Router();
const Product = require("../models/buy_sell/productSchema");
const Requirement = require("../models/buy_sell/requirementSchema");

//EndPoint for dislaying all products on buying screen

router.get("/getproducts", (req, res) => {
  Product.find().then((result) => {
    res.send(result);
  });
});

//Endpoint for listing items that a particular user has posted

router.get("/ownsproduct", (req, res) => {
  Product.find(
    { posted_id: req.query.user_id }.then((result) => {
      res.send(result);
    })
  );
});

//Endpoint for posting a new requirement in buy/sell

router.post("/newrequirement", (req, res) => {
  const requirement = new Requirement({
    title: req.body.title,
    description: req.body.description,
    required_by: req.body.required_by,
    timestamp: req.body.timestamp,
  });
  requirement.save().then(() => {
    res.send(requirement);
  });
});

//Deleting requirement

router.post("/deleterequirement", (req, res) => {
  Requirement.deleteOne({ /* */}).then((result) => {
    res.send("deleted");
  });
});

//Endpoint to get all the requirements on feed

router.get('/getrequirements',(req,res) => {
    Requirement.find().then(result => {
        res.send(result);
    })
})

//Endpoint to get all the requirements posted by a specific user





