const express = require("express");
const {
  createLightEngineeringPhotosDocument,
  getLightEngineeringPhotosDocumentById,
} = require("../controllers/lightEngineeringPhotosController");

const router = express.Router();

router
  .route("/light-engineering-photos-document/new")
  .post(createLightEngineeringPhotosDocument);

router
  .route("/download-light-engineering-photos-report/:documentId")
  .get(getLightEngineeringPhotosDocumentById);

module.exports = router;
