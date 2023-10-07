
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // for generating unique IDs

const app = express();
app.use(express.json());
const port = 3000;
const dataFilePath = "./db.json"; // Path to your JSON file

// Enable CORS for all routes
app.use(cors());

//new id generation function===
const newId = (items) => {
  const maxId = items.reduce((maxId, item) => Math.max(item.id, maxId), -1);
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("fake json server and storage");
});

// Define a GET route to fetch the array data
app.get("/data", (req, res) => {
  // Read the data from the JSON file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  
  // Parse the _limit query parameter, default to 5 if not provided
  const limit = parseInt(req.query._limit) || data.length;

  // Slice the array to limit the number of items
  const limitedData = data.slice(0, limit);

  // Return the limited data
  res.json(limitedData);
});

//Get single data
app.get("/data/:id", (req, res) => {
  const id = req.params.id;

  // Read the data from the JSON file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // Find the data item based on its ID
  const dataItem = data.find((item) => item.id == id);

  if (!dataItem) {
    return res.status(404).json({ message: "Data not found" });
  }

  // Return the found data item
  res.json(dataItem);
});


app.post("/data", (req, res) => {
  const newData = req.body;

  // Read the data from the JSON file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // Assign a unique ID to the new data
  newData.id = newId(data);

  // Add the new data to the array
  data.push(newData);

  // Write the updated data back to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

  res.json({ message: "Data created successfully", newData });
});

app.put("/data/:id", (req, res) => {
  const updatedData = req.body;
  const idToUpdate = req.params.id;
 
  // Read the data from the JSON file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  // Find the data item to update based on its ID
  const dataToUpdate = data.find((item) => item.id ==(idToUpdate));

  if (!dataToUpdate) {
    return res.status(404).json({ message: "Data not found" });
  }

  // Update the data properties
  Object.assign(dataToUpdate, updatedData);

  // Write the updated data back to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

  res.json({ message: "Data updated successfully", updatedData });
});

// ...==========================================================

// Define a PATCH route to partially update data based on its ID
app.patch("/data/:id", (req, res) => {
  const partialUpdate = req.body;
  const idToUpdate = req.params.id;

  // Read the data from the JSON file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // Find the data item to update based on its ID
  const dataToUpdate = data.find((item) => item.id == idToUpdate);

  if (!dataToUpdate) {
    return res.status(404).json({ message: "Data not found" });
  }

  // Apply partial updates to the data item
  for (let key in partialUpdate) {
    if (partialUpdate.hasOwnProperty(key)) {
      dataToUpdate[key] = partialUpdate[key];
    }
  }

  // Write the updated data back to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

  res.json({ message: "Data partially updated successfully", updatedData: dataToUpdate });
});

// ...



// Define a DELETE route to remove data based on its ID
app.delete("/data/:id", (req, res) => {
  const idToDelete = req.params.id;

  // Read the data from the JSON file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // Find the data item to delete based on its ID
  const indexToDelete = data.findIndex((item) => item.id == idToDelete);

  if (indexToDelete === -1) {
    return res.status(404).json({ message: "Data not found" });
  }

  // Remove the data item from the array
  data.splice(indexToDelete, 1);

  // Write the updated data back to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

  res.json({ message: "Data deleted successfully" });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
