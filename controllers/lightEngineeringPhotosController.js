const lightEngineeringPhotosDocument = require("../models/lightEngineeringPhotosModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { default: axios } = require("axios");

// Create light engineering document
exports.createLightEngineeringPhotosDocument = catchAsyncErrors(
  async (req, res, next) => {
    const { leImages } = req.body;

    const newLightEngineeringPhotos = new lightEngineeringPhotosDocument({
      leImages,
    });

    await newLightEngineeringPhotos.save();

    res.status(201).json({
      success: true,
      document: newLightEngineeringPhotos,
    });
  }
);

exports.getLightEngineeringPhotosDocumentById = catchAsyncErrors(
  async (req, res, next) => {
    const { documentId } = req.params;

    const singleDocument = await lightEngineeringPhotosDocument.findById(
      documentId
    );

    if (!singleDocument) {
      return next(new ErrorHander("Document not found", 404));
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/light-engineering-photos-report",
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
