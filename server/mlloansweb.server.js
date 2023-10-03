require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");


const { SYMPH_API_ROUTER } = require("./router/index.routes"); 
const Logger = require("./config/logger.config");

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.use(express)

app.use(cors(
  {
    credentials: true,
    origin: "http://ml-loans-dev.mlhuillier.com:3000"
  }
))

app.use(express.static(path.join(__dirname, '../client/build')));
// app.use(express.static(path.resolve(__dirname, "../client/public")));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..' ,'client', 'build', 'index.html'));
});

app.use('/api/loans/symph', SYMPH_API_ROUTER);


app.listen(PORT, () => {
    Logger.loggerInfo.addContext("context", "ML LOANS");
    Logger.loggerInfo.info(`Server listening on port: ${PORT}`);
    Logger.loggerError.addContext("context", "ML LOANS");
    Logger.loggerError.error(`Server listening on port: ${PORT}`);
    Logger.loggerFatal.addContext("context", "ML LOANS");
    Logger.loggerFatal.fatal(`Server listening on port: ${PORT}`);
    console.log("Server listening on port: ", PORT);
})