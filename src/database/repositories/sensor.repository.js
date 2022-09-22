import mongoose from "mongoose";
import { Sensor } from "../../models/sensor.model.js";
import "../connection.js";
import { v4 as uuidv4 } from "uuid";

export class SensorRepository {
  save = async (sensor) => {
    try {
      await sensor.save();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  findAll = async () => {
    try {
      return await Sensor.find().select("-_id");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  findOne = async (search) => {
    try {
      return await Sensor.findOne({
        $or: [{ id: search }, { name: search }, {serial_number: parseInt(search)}],
      }).select("-_id");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  delete = async (id) => {
    try {
      // console.log('ae41a741-dfe3-4e38-9f3d-e41d91834ab4');
      let {deletedCount} = await Sensor.deleteOne({id});
      if(deletedCount != 0){
        console.log('DELETED SENSOR');
      }else{
        console.log('SENSOR NOT FOUND TO DELETE');
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  update = async (id, data) => {
    try {
      const { name, serial_number } = data;
      await Sensor.updateOne(
        { id }, //buscar con el id
        { name, serial_number } //actualiar nombre y number
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
}
