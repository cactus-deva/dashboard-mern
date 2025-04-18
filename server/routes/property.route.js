import express from "express";
import {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controller/property.controller.js";

const propertyRouter = express.Router();
propertyRouter.route("/")
    .get(getAllProperties)
    .post(createProperty);
propertyRouter.route("/:id")
  .get(getPropertyDetail)
  .patch(updateProperty)
  .delete(deleteProperty);

  export default propertyRouter