const express = require("express");
const {
  createLightEngineeringQuestionsDocument,
  getLightEngineeringQuestionDocumentById,
} = require("../controllers/lightEngineeringQuestionsController");

const router = express.Router();

router
  .route("/light-engineering-questions-document/new")
  .post(createLightEngineeringQuestionsDocument);

router
  .route("/download-light-engineering-questions-report/:documentId")
  .get(getLightEngineeringQuestionDocumentById);

module.exports = router;
