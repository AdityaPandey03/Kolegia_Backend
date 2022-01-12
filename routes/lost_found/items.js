import express from "express";
import expressAsyncHandler from "express-async-handler";
import dataLost from "../../dataLostFound.js";

//models
import lostFoundItem from "../../models/lost_found/itemSchema.js";

const lostFoundRouter = express.Router();

//endpoint for posting dummy data

lostFoundRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      const createdItems = await lostFoundItem.insertMany(dataLost.items);
      res.send({ createdItems });
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//endpoint for displaying all lost items 

lostFoundRouter.get(
    "/getlostitems",
    expressAsyncHandler(async (req, res) => {
      try{
        const items = await lostFoundItem.find({});
        res.status(200).json(items);
      } catch (err) {
        res.status(500).json({ message: "Error in getting items" });
      }
    })
  );

  //endpoint for displaying lost item by id

  lostFoundRouter.get(
    "/getlostitems/:id",
    expressAsyncHandler(async (req, res) => {
      try{
        const item = await lostFoundItem.findById(req.params.id);
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({ message: "Item not found" });
        }
      } catch (err) {
        res.status(500).json({ message: "Error in getting item" });
      }
    })
  );

  //endpoint for posting new lost item

  lostFoundRouter.post(
    "/postlostitem",
    expressAsyncHandler(async (req, res) => {
      try {
        const { item_name, item_id, id_posted_by, posted_by, item_pictures, question, description } = req.body;
        const newItem = new lostFoundItem({
          item_name, 
          item_id, 
          id_posted_by,
          posted_by, 
          item_pictures, 
          question, 
          description,
        });
        await newItem.save();
        res.status(200).json(newItem);
      } catch (err) {
        res.status(500).json({ message: "Error in posting your lost item" });
      }
    })
  );

  //endpoint for all tickets raised by a user in lost found section

  lostFoundRouter.get(
    "/mylostitems",
    expressAsyncHandler(async (req, res) => {
      try {
        const userItems = await lostFoundRouter.find({
          id_posted_by: req.body.userId,
        });
        if (userItems) {
          res.status(200).json(userItems);
        } else {
          res.status(404).json({ message: "Not founding your item " });
        }
      } catch (err) {
        res.status(500).json({ message: "Error in fetching user's lost item" });
      }
    })
  );

  export default lostFoundRouter;