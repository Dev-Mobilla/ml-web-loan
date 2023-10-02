require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./route/add_loan_route");
const cors = require("cors");

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

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
// app.use(express.static(path.resolve(__dirname, "../client/public")));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..' ,'client', 'build', 'index.html'));
});
app.use('/api',router);

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
})