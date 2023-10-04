const express = require('express');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const newsFeedRouter = require('./routes/newsFeedRoutes');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD
}));

app.use('/images', express.static('./uploads/img'));

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