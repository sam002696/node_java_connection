const lightEngineeringQuestionsDocument = require("../models/lightEngineeringQuestionsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { default: axios } = require("axios");

// Create light engineering document
exports.createLightEngineeringQuestionsDocument = catchAsyncErrors(
  async (req, res, next) => {
    const {
      title,
      conductedBy,
      generalInfo,
      organization,
      rawMaterial,
      manufacturing,
      machineUsed,
      safetyMeasures,
      safetyRelations,
      houseKeeping,
      existingMachinerySafety,
      productOutput,
      identification,
    } = req.body;

    const newLightEngineeringQuestions = new lightEngineeringQuestionsDocument({
      title,
      conductedBy,
      generalInfo,
      organization,
      rawMaterial,
      manufacturing,
      machineUsed,
      safetyMeasures,
      safetyRelations,
      houseKeeping,
      existingMachinerySafety,
      productOutput,
      identification,
    });

    await newLightEngineeringQuestions.save();

    res.status(201).json({
      success: true,
      document: newLightEngineeringQuestions,
    });
  }
);

exports.getLightEngineeringQuestionDocumentById = catchAsyncErrors(
  async (req, res, next) => {
    const { documentId } = req.params;

    const singleDocument = await lightEngineeringQuestionsDocument.findById(
      documentId
    );

    if (!singleDocument) {
      return next(new ErrorHander("Document not found", 404));
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/light-engineering-questions-report",
        singleDocument,
        {
          responseType: "arraybuffer",
        }
      );
      console.log("response :>> ", response);
      res.setHeader("Content-Type", "application/pdf");
      return res.send(response.data);
    } catch (error) {
      console.error("Error generating report", error);
      return res.status(500).send("Server error");
    }
  }
);
