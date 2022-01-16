import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../../Authentication/auth.js";
import data from "../../data.js";

//models
import BuySellProduct from "../../models/buy_sell/buySellProductSchema.js";
import Requirement from "../../models/buy_sell/requirementSchema.js";

const buySellRouter = express.Router();

//endpoint for posting dummy data

buySellRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      const createdProducts = await BuySellProduct.insertMany(data.products);
      res.send({ createdProducts });
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//EndPoint for dislaying all products on buying screen

buySellRouter.get(
  "/getproducts",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await BuySellProduct.find({});
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "Error in getting products" });
    }
  })
);

//Endpoint to get a particular item data(from item_id)

buySellRouter.get(
  "/getproduct/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await BuySellProduct.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error in getting product" });
    }
  })
);

//Endpoint for listing items that a particular user has posted

buySellRouter.get(
  "/userproducts",
  expressAsyncHandler(async (req, res) => {
    try {
      const userProducts = await BuySellProduct.find({
        sellerUserId: req.body.userId,
      });
      if (userProducts) {
        res.status(200).json(userProducts);
      } else {
        res.status(404).json({ message: "did not find user products " });
      }
    } catch (err) {
      res.status(500).json({ message: "Error in fetching user products" });
    }
  })
);

//post a new item for selling

buySellRouter.post(
  "/newproduct",
  expressAsyncHandler(async (req, res) => {
    try {
      const { itemName, price, description, productImage, userId } = req.body;
      const newItem = new BuySellProduct({
        itemName,
        sellerUserId: userId,
        price,
        description,
        productImage,
      });

      await newItem.save();
      res.status(200).json(newItem);
    } catch (err) {
      res.status(500).json({ message: "Error in fetching user products" });
    }
  })
);

//Endpoint for posting a new requirement in buy/sell

buySellRouter.post(
  "/newrequirement",
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, description, requiredById } = req.body;
      const requirement = new Requirement({
        title,
        description,
        requiredById,
      });
      await requirement.save();
      res.status(200).json(requirement);
    } catch (err) {
      res.status(500).json({ message: "Error in creating new requirement" });
    }
  })
);

//Deleting requirement

buySellRouter.delete(
  "/deleterequirement/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      res.status(200).json({ message: "requirement deleted succesfully" });
      // const user = await User.findById(req.body.userId);
      // const product = await Requirement.findById(req.params.id)
      // if(user._id === product.required_by){
      //   await Requirement.findByIdAndDelete(req.params.id);
      //   res.status(200).json({message : "requirement deleted succesfully"});
      // }else{
      //   res.status(403).json({message : "You are not authorized to delete this item."});
      // }
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//Endpoint to get all the requirements on feed
buySellRouter.get(
  "/getrequirements",
  expressAsyncHandler(async (req, res) => {
    try {
      const requirements = await Requirement.find({});
      res.status(200).json(requirements);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//Endpoint to get all the requirements posted by a specific user

buySellRouter.get(
  "/userrequirements",
  expressAsyncHandler(async (req, res) => {
    try {
      const userRequirements = await Requirement.find({
        requiredById: req.body.userId,
      });
      res.status(200).json(userRequirements);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

export default buySellRouter;
