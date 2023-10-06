const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const newsFeedRouter = require('./routes/newsFeedRoutes');

const app = express();

//PROTECTION MDWs
app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD
}));

app.use(helmet({
    crossOriginResourcePolicy: false,
}));

const limiter = rateLimit({
    max: 600, // Limit each IP to X requests per `window`
    windowMs: 60 * 60 * 1000, // 60 minutes
    message: 'Túl sok kérés erről az IP-címről. Próbáld újra később!'
});

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp({
    whitelist: [
        // whitelist for allow duplicates
    ]
}));

app.use('/images', express.static('./uploads/img'));

app.use(compression());

//API ROUTES
const apiPrefix = "/api/v1";

app.use(`/auth`, authRouter);
app.use(`${apiPrefix}/users`, userRouter);
app.use(`${apiPrefix}/news`, newsFeedRouter);

app.all('*', (req,res, next) => {
    next(new AppError(`Nem található ${req.originalUrl} a szerveren!❌`,404));
});

app.use(globalErrorHandler);

module.exports = app;