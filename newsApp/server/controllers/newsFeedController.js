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

//-----------------------------POST-----------------------------
//exports.createPost = factory.createOne(NewsfeedPost, "post");

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