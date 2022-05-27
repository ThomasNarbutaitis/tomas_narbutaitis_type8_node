const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const { accountRoutes } = require('./routes/accountRoutes');

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
app.use('/', accountRoutes);

app.listen(PORT, () => console.log('Server is runnin on port', PORT));
