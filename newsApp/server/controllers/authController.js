const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');

const keys = require('../oauth2.keys.json');

const oAuth2Client = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
);

exports.googleAuth = catchAsync(async (req, res, next) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    });

    res.redirect(authUrl);
});

//ÁT KELL ÍRNI MAJD APPERRORR-RA!
exports.googleAuthCallBack = catchAsync(async (req, res, next) => {
    const code = req.query.code;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        const idToken = tokens.id_token;
        const decoded = await oAuth2Client.verifyIdToken({idToken});
        const payload = decoded.getPayload()

        const user = await User.findOne({sub: payload.sub});

        if (!user) {
            await User.create({
                sub: payload.sub,
                username: payload.name,
                email: payload.email,
                pictureURL: payload.picture,
            });
        }

        await User.findOneAndUpdate({ sub: payload.sub }, { lastLogin: new Date() , pictureURL: payload.picture});

        const clientURL = process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD;
        res.redirect(clientURL);
    } catch (error) {
        console.log(error);
        return next(new AppError('Hitelesítési hiba történt', 500));
    }
});

exports.protect = catchAsync(async (req, res, next) => {
    // get and check token
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError('Nincs bejelentkezve!', 401));
    }

    const decoded = await oAuth2Client.verifyIdToken({idToken});
    const payload = decoded.getPayload()
    console.log(payload.sub);

    // check if user still exists
    const currentUser = await User.findById(payload.sub);
    if (!currentUser) {
        return next(new AppError('A tokenhez tartozó felhasználó már nem létezik!', 401));
    }

    req.user = currentUser;
    next();
});
