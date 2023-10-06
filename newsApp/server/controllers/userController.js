const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const NewsFeedPost = require("../models/newsFeedPostModel");

exports.getMe = (req, res, next) => {
    req.params.id = req.user.sub;
    next();
};

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findOne({sub: req.params.id});

    if (!user) {
        return next(new AppError('Nem található felhasználó ezzel az ID-val.😢', 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.getDetailedUserById = catchAsync(async (req, res, next) => {
    const user = await User.findOne({sub: req.params.id});

    if (!user) {
        return next(new AppError('Nem található felhasználó ezzel az ID-val.😢', 404));
    }

    const newsFeedPosts = await NewsFeedPost.find({ createdBy: user._id });

    res.status(200).json({
        status: "success",
        data: {
            user,
            newsFeedPosts
        },
    });
});