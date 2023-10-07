// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// const port = 3000;
// const dataArray = require("./db.json");

// // Enable CORS for all routes
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("fake json server and storage");
// });

// // Define a GET route to fetch the array data
// app.get("/data", (req, res) => {
//   // Parse the limit query parameter, default to 1 if not provided
//   const limit = parseInt(req.query._limit) || 1;

//   // Slice the array to limit the number of items
//   const limitedData = dataArray.slice(0, limit);
//   res.json(limitedData);
// });
// app.post("/data", (req, res) => {
//   const postData = req.body;
//   console.log("body", postData);
//  res.status(200).json({ message: "Data posted" });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
