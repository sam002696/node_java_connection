const lightEngineeringDocument = require("../models/lightEngineeringModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { default: axios } = require("axios");

// Create light engineering document
exports.createLightEngineeringDocument = catchAsyncErrors(
  async (req, res, next) => {
    const {
      reportName,
      reportYear,
      department,
      preface,
      listOfContents,
      contentsSummary,
      conclusionsRecommendations,
    } = req.body;

    const newLightEngineering = new lightEngineeringDocument({
      reportName,
      reportYear,
      department,
      preface,
      listOfContents,
      contentsSummary,
      conclusionsRecommendations,
    });

    await newLightEngineering.save();

    res.status(201).json({
      success: true,
      document: newLightEngineering,
    });
  }
);

exports.getLightEngineeringDocumentById = catchAsyncErrors(
  async (req, res, next) => {
    const { documentId } = req.params;

    const singleDocument = await lightEngineeringDocument.findById(documentId);

    if (!singleDocument) {
      return next(new ErrorHander("Document not found", 404));
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/light-engineering-report",
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
