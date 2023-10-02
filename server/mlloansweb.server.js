require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const ROUTER = require("./router/router");

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

app.use('/', ROUTER);


app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
})