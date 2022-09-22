import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/Sensor")
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
