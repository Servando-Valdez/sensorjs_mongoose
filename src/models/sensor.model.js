import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const schema = new Schema(
  {
    id: {
      type: String,
      default: () => {
        return uuidv4();
      },
      unique: true,
    },
    name: { type: String, maxLength: 20, required: true, unique: true },
    serial_number: { type: Number, max: 50, required: true, unique: true },
  },
  { timestamps: true, versionKey: false}
);

schema.pre("save", function (next) {
  const sensor = this;
  if (sensor.name.length > 20) {
    throw new Error("Name must has 20 characters max");
  }

  if (sensor.serial_number > 50) {
    throw new Error("Serial number must be menor of 50");
  }
  console.log("Saving sensor");
  next();
});

schema.post("save", function (doc) {
  console.log("Saved sensor", doc.name);
});

// //update
schema.pre("updateOne", function (next) {
  const { name, serial_number } = this._update;
  if (name.length > 20) {
    throw new Error("Name must has 20 characters max");
  }

  if(typeof(parseInt(serial_number)) !== 'number'){
    throw new Error("Serial number must be number");
  }

  if (serial_number > 50) {
    throw new Error("Serial number must be menor of 50");
  }
  console.log("Updating Sensor");
  next();
});

schema.post("updateOne", function(){
  console.log('updated sensor');
})

export const Sensor = mongoose.model("Sensor", schema);