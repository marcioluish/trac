const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');

const app = express();
const server = http.createServer(app);

const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');
const unitRoutes = require('./routes/unit');
const assetRoutes = require('./routes/asset');
const statusRoutes = require('./routes/status');
const healthRoutes = require('./routes/health');
const companyDataRoutes = require('./routes/companyData');
const kafkaConsumerRoutes = require('./routes/kafkaConsumer');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(companyRoutes);
app.use('/user', userRoutes);
app.use(unitRoutes);
app.use(assetRoutes);
app.use(statusRoutes);
app.use(healthRoutes);
app.use(companyDataRoutes);
app.use(kafkaConsumerRoutes);

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@trac_db:27017?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('failed to connect to DB');
      console.error(err);
    } else {
      console.log('connected to DB');
      server.listen(8000);
      const io = require('./socket').init(server);
      io.on('connection', (socket) => {
        console.log('Frontend Connected!');
      });
    }
  }
);
