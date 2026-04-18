require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

const authRoutes = require('./routes/auth');
const dashRoutes = require('./routes/dashboard');
app.use('/', authRoutes);
app.use('/', dashRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
