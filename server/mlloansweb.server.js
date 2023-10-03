const express = require("express");
const path = require("path");
const router = require("./route/add_loan_route");
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;


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

app.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
})