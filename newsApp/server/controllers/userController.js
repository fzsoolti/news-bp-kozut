const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

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