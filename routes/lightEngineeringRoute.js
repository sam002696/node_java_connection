const express = require("express");
const {
  createLightEngineeringDocument,
  getLightEngineeringDocumentById,
} = require("../controllers/lightEngineeringController");

const router = express.Router();

router
  .route("/light-engineering-document/new")
  .post(createLightEngineeringDocument);

router
  .route("/download-light-engineering-report/:documentId")
  .get(getLightEngineeringDocumentById);

module.exports = router;
