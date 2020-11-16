const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const router = require('./routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', router);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () =>
  console.log('Database connection established successfully')
);

app.listen(PORT, console.log('Server started on port ' + PORT));
