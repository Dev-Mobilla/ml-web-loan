//These is for package.json in the root folder
// "start-client": "react-scripts start",
// "start": "npm run build && (cd server && npm start)"
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express(); // create express app
const port = 3000;
const directoryPath = path.resolve(__dirname, '../public');

// const options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['js', 'jsx'],
//   index: false,
//   maxAge: '1d',
//   redirect: false,
//   setHeaders(req, res, path, stat) {
//     res.set('x-timestamp', Date.now());
//     res.set('Content-Security-Policy', "default-src 'self'");
//     res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
//     res.set('X-Frame-Options', 'DENY');
//     res.set('X-XSS-Protection', '1; mode=block');
//     res.set('X-Content-Type-Options', 'nosniff');
//     res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//   },
// };

// Add middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(directoryPath))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// app.route("/manage-loans")
//   .get((request, response) => {
//     response.send("This is GET METHOD in manage loans from Express server");
//     response.send(request.body);
//   })
//   .post((request, response) => {
//     response.send("This is POST METHOD in manage loans from Express server");
//   });


// app.get("/vehicle-loans", (request, response) => {
//   try {
//     response.send("Success");
//   } catch (error) {
//     console.error(error);
//     response.status(500).send("Something went wrong on the server");

//   }
// });
// app.get("/vehicle-loan/personal-details", (request, response) => {
//   throw new Error("Something went wrong");
// });
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send("Something wrong in the server");
  response.status(404).send("Not Found!");

});
// start express server on port 5000
app.listen(port, () => {
  console.log("server started on port 3000");
});


