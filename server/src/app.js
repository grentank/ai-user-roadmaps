const express = require('express');
const placesRouter = require('./routers/placesRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const tokensRouter = require('./routers/tokensRouter');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/places', placesRouter);

module.exports = app;
