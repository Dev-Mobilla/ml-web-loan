require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./route/add_loan_route");
const cors = require("cors");

// const ROUTER = require("./router/router");

const { SYMPH_API_ROUTER } = require("./router/index.routes"); 
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.use(express)

app.use(cors(
  {
    credentials: true,
    origin: "http://ml-loans-dev.mlhuillier.com:3000"
  }
))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://ml-loans-dev.mlhuillier.com:3000');
  next();
});
app.use(cors({ origin: 'http://ml-loans-dev.mlhuillier.com:3000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
// app.use(express.static(path.resolve(__dirname, "../client/public")));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});
app.use('/api', router);
  res.sendFile(path.resolve(__dirname, '..' ,'client', 'build', 'index.html'));
});
app.use('/api/loans/symph', SYMPH_API_ROUTER);
app.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
})