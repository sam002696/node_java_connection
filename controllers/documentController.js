const document = require("../models/documentModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { default: axios } = require("axios");

// Create document
exports.createdocument = catchAsyncErrors(async (req, res, next) => {
  const { name, email, description, fireSafetyIssues } = req.body;

  const newDocument = new document({
    name,
    email,
    description,
    fireSafetyIssues,
  });

  await newDocument.save();

  res.status(201).json({
    success: true,
    document: newDocument,
  });
});

exports.getDocumentById = catchAsyncErrors(async (req, res, next) => {
  const { documentId } = req.params;

  const singleDocument = await document.findById(documentId);

  if (!singleDocument) {
    return next(new ErrorHander("Document not found", 404));
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/new-generate-report",
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
});

// Get All document
exports.getAlldocuments = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const { email } = req.query;

  if (!email) {
    return next(new ErrorHander("Email query parameter is required", 400));
  }

  const documentsCount = await document.countDocuments({ email });

  if (documentsCount === 0) {
    return next(
      new ErrorHander("No documents found for the provided email", 404)
    );
  }

  const apiFeature = new ApiFeatures(document.find(), req.query)
    .search()
    .filter();

  let documents = await apiFeature.query;

  let filtereddocumentsCount = documents.length;

  apiFeature.pagination(resultPerPage);

  documents = await apiFeature.query;

  res.status(200).json({
    success: true,
    documents,
    documentsCount,
    resultPerPage,
    filtereddocumentsCount,
  });
});

// Get All document (Admin)
exports.getAdmindocuments = catchAsyncErrors(async (req, res, next) => {
  const documents = await document.find();

  res.status(200).json({
    success: true,
    documents,
  });
});

// Get document Details
exports.getdocumentDetails = catchAsyncErrors(async (req, res, next) => {
  const document = await document.findById(req.params.id);

  if (!document) {
    return next(new ErrorHander("document not found", 404));
  }

  res.status(200).json({
    success: true,
    document,
  });
});

// Update document -- Admin

exports.updatedocument = catchAsyncErrors(async (req, res, next) => {
  let document = await document.findById(req.params.id);

  if (!document) {
    return next(new ErrorHander("document not found", 404));
  }

  // Images Start Here
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // if (images !== undefined) {
  //   // Deleting Images From Cloudinary
  //   for (let i = 0; i < document.images.length; i++) {
  //     await cloudinary.v2.uploader.destroy(document.images[i].public_id);
  //   }

  //   const imagesLinks = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const result = await cloudinary.v2.uploader.upload(images[i], {
  //       folder: "documents",
  //     });

  //     imagesLinks.push({
  //       public_id: result.public_id,
  //       url: result.secure_url,
  //     });
  //   }

  //   req.body.images = imagesLinks;
  // }

  document = await document.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    document,
  });
});

// Delete document

exports.deletedocument = catchAsyncErrors(async (req, res, next) => {
  const document = await document.findById(req.params.id);

  if (!document) {
    return next(new ErrorHander("document not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < document.images.length; i++) {
    await cloudinary.v2.uploader.destroy(document.images[i].public_id);
  }

  await document.remove();

  res.status(200).json({
    success: true,
    message: "document Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createdocumentReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, documentId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const document = await document.findById(documentId);

  const isReviewed = document.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    document.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    document.reviews.push(review);
    document.numOfReviews = document.reviews.length;
  }

  let avg = 0;

  document.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  document.ratings = avg / document.reviews.length;

  await document.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a document
exports.getdocumentReviews = catchAsyncErrors(async (req, res, next) => {
  const document = await document.findById(req.query.id);

  if (!document) {
    return next(new ErrorHander("document not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: document.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const document = await document.findById(req.query.documentId);

  if (!document) {
    return next(new ErrorHander("document not found", 404));
  }

  const reviews = document.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await document.findByIdAndUpdate(
    req.query.documentId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
