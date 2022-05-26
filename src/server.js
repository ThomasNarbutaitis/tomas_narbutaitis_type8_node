const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/', userRoutes);

app.listen(PORT, () => console.log('Server is runnin on port', PORT));
