require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const Logger = require("./config/logger.config");

const { SYMPH_API_ROUTER, ML_LOAN_ROUTER, PUBLIC_ROUTER, ML_PUBLIC_ROUTER } = require("./router/index.routes"); 
const {ErrorLogger, ErrorResponder} = require("./middleware/symph.middleware");
const { Auth } = require("./middleware/auth.middleware");

const app = express();

const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}

const server = https.createServer(options, app);

app.use(express.json());

app.use(cors(
  {
    credentials: true,
    origin: process.env.ML_LOANS_ORIGIN
  }
  ))
  
  //ROUTES
app.use('/api/ml-loans/symph', PUBLIC_ROUTER);
// ml add loan
app.use('/api/ml-loans/loans', ML_PUBLIC_ROUTER);
// direct symph api
app.use('/api/loans/symph', SYMPH_API_ROUTER);
app.use('/api/ml-loans', Auth , ML_LOAN_ROUTER);

// MIDDLEWARES
app.use(ErrorLogger)
app.use(ErrorResponder);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


server.listen(PORT, () => {
  Logger.loggerInfo.addContext("context", "ML LOANS");
  Logger.loggerInfo.info(`Server listening on port: ${PORT}`);
  console.log("Https Server listening on port: ", PORT);
  // console.log(path.resolve(__dirname, ));
})