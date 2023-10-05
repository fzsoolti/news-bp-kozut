const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require('../utils/apiFeatures');

//------------------ GET ------------------
exports.getAll = (Model, documentName, sortOptions) => catchAsync(async (req, res) => {

    //execute query
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort(sortOptions)
      .limitFields()
      .paginate();
    const document = await features.query;
    const numOfResults = await Model.countDocuments(req.query);
  
    res.status(200).json({
      status: "success",
      results: document.length,
      numOfResults:numOfResults,
      requestedAt: req.requestTime,
      data: {
        [documentName]:document,
      },
    });
  });

exports.getOneById = (Model, documentName, popOptions) => catchAsync(async (req, res,next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
        query = query.populate(popOptions);
    }

    const document = await query;
  
    if (!document) {
      return next(new AppError(`Nem található (${documentName}) ezzel az ID-val!😢`,404));
    }
  
    res.status(200).json({
      status: "success",
      data: {
        [documentName]:document,
      },
    });
  });

//------------------ POST ------------------
exports.createOne = (Model, documentName) => catchAsync(async (req, res, next) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [documentName]: newDocument,
      },
    });
  });

//------------------ PATCH ------------------
exports.updateOneById = (Model, documentName) => catchAsync(async (req, res) => {
    console.log(req.body);

    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!document) {
      return next(new AppError(`Nem található (${documentName}) ezzel az ID-val!😢`,404));
    }
  
    res.status(200).json({
      status: "success",
      data: {
        [documentName]: document,
      },
    });
  });

//------------------ DELETE ------------------
exports.deleteOneById = (Model, documentName, isNext) => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
  
    if (!document) {
      return next(new AppError(`Nem található (${documentName}) ezzel az ID-val!😢`,404));
    }

    if (isNext) {
      return next();
    } 

    res.status(204).json({
      status: "success",
      data: null,
    });
    
  });

  exports.deleteAll = (Model, isNext) => catchAsync(async (req, res, next) => {
    await Model.deleteMany();
  
    if (isNext) {
      return next();
    } 
    
    res.status(204).json({
      status: "success",
      data: null,
    });
    
  });