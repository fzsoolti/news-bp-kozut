const factory = require('./handlerFactory');
const NewsfeedPost = require("../models/newsFeedPostModel");

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
exports.createPost = factory.createOne(NewsfeedPost, "post");