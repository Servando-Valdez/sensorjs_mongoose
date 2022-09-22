import { SensorRepository } from "../database/repositories/sensor.repository.js";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

export class SensorController {
  sensorRepositoy = new SensorRepository();

  /**
   * Save a sensor to database
   * @param {Sensor} sensor 
   */
  saveSensor = async (sensor) => {
    try {
      await this.sensorRepositoy.save(sensor);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /**
   * Update a sensor
   * @param {'uuid'} id 
   * @param {'name and serial_number'} newData 
   */
  updateSensor = async (id, newData) => {
    try {
      if (!validator.isUUID(id)) {
        throw new Error("id most be a uuid");
      }
      let sensor = await this.findOneSensor(id);
      if (!sensor) {
        throw new Error(`Sensor with id: ${id} not found to update`);
      }
      await this.sensorRepositoy.update(id, newData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /**
   * Get All sensors
   * @returns All sensors
   */
  findAllSensors = async () => {
    try {
      const sensors = await this.sensorRepositoy.findAll();
      if (sensors === undefined || !sensors || sensors === null) {
        throw new Error("Sensors not obtained");
      }
      return sensors;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /**
   * Search and get a specific sensor
   * @param {'id or name'} search 
   * @returns sensor
   */
  findOneSensor = async (search) => {
    try {
      const sensor = await this.sensorRepositoy.findOne(search);
      if (sensor === undefined || !sensor || sensor === null) {
        throw new Error("Sensor not found");
      }
      return sensor;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /**
   * Delete a sensor from database
   */
  deleteSensor = async (id) => {
    try {
        // console.log(uuidv4('ae41a741-dfe3-4e38-9f3d-e41d91834ab4'));

      if (!validator.isUUID(id)) {
        throw new Error("id most be a uuid");
      }
    //   await this.findOneSensor(id);
      await this.sensorRepositoy.delete(id);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
}
