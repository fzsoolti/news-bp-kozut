const factory = require('./handlerFactory');
const NewsFeedPost = require("../models/newsFeedPostModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

//-----------------------------IMAGE UPLOAD-----------------------------
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/img');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `post-${file.originalname}-${Date.now()}.${ext}`);
    }
});

const multerFiler = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Érvénytelen formátum!',400), false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFiler
});

exports.uploadPostPhoto = upload.single('image');

//-----------------------------GET-----------------------------
exports.getNewsFeedPostById = factory.getOneById(NewsFeedPost, "post",{ path: 'createdBy' });

//-----------------------------POST-----------------------------
exports.createPost = catchAsync(async (req, res, next) => {
    if (!req.file)  return next(new AppError('Kérlek, tölts fel egy képet!', 400));

    req.body.image = req.file.filename;
    req.body.createdBy = req.user.id;

    const newPost = await NewsFeedPost.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  });

//-----------------------------PATCH-----------------------------
exports.updateNewsFeedPostById = catchAsync(async (req, res, next) => {

  if (req.file){
    req.body.image = req.file.filename;
  }

  const updatedPost = await NewsFeedPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!updatedPost) {
    return next(new AppError(`Nem található Poszt ezzel az ID-val!😢`,404));
  }

  updatedPost.lastModified = new Date();
  await updatedPost.save();
  
  res.status(200).json({
    status: "success",
    data: {
      updatedPost,
    },
  });

});

//-----------------------------DELETE-----------------------------
exports.deleteNewsFeedPostById = factory.deleteOneById(NewsFeedPost,"post");

//-----------------------------acces protection-----------------------------
exports.checkPostOwner = catchAsync(async (req, res, next) => {
 const newsFeedPost = await NewsFeedPost.findById(req.params.id);

  if (newsFeedPost.createdBy.toString() != req.user._id.toString()) {
    return next(new AppError('Csak saját poszt módosítható!', 401));
  }

  next();
});
