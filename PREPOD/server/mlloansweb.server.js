require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const Logger = require("./config/logger.config");

const { SYMPH_API_ROUTER, ML_LOAN_ROUTER, PUBLIC_ROUTER, ML_PUBLIC_ROUTER } = require("./router/index.routes"); 
const {ErrorLogger, ErrorResponder} = require("./middleware/symph.middleware");
const { Auth } = require("./middleware/auth.middleware");

const app = express();

const PORT = process.env.PORT;
app.use(express.json());

app.use(cors(
  {
    credentials: true,
    //origin: process.env.ML_LOANS_ORIGIN
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


app.listen(PORT, () => {
  Logger.loggerInfo.addContext("context", "ML LOANS");
  Logger.loggerInfo.info(`Server listening on port: ${PORT}`);
  console.log("Server listening on port: ", PORT);
  // console.log(path.resolve(__dirname, ));
})
