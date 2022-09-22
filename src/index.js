import mongoose from "mongoose";
import { question } from "readline-sync";
import { SensorController } from "./controllers/sensor.controller.js";
import { Sensor } from "./models/sensor.model.js";
const sensorController = new SensorController();
const showMenu = () => {
  return `Menu
        1. Register sensor
        2. Update sensor with its code
        3. Delete sensor with its code
        4. Consult all sensor
        5. Search sensor with its name or id
        6. Exit`;
};

let running = true;
console.log(`Welcome, In this program you can to register,
update, delete, search and consult Sensors`);

while (running) {
  console.log(showMenu());
  const option = question("write the number option: ");
  switch (option) {
    case "1":
      try {
        console.log("-SAVE SENSOR-");
        const name = question("Write the name of the sensor: ");
        const serial_number = question("Write the serial number: ");
        const sensor = new Sensor({
          name: name,
          serial_number: serial_number,
        });
        await sensorController.saveSensor(sensor);
      } catch (error) {
        console.error("Error:", error.message);
      }
      break;
    case "2":
      try {
        console.log("-UPDATE SENSOR-");
        const id = question("Write the id of the sensor: ");
        const name = question("Write the new name of the sensor: ");
        const serial_number = question("Write the new serial number: ");
        await sensorController.updateSensor(id, { name, serial_number });
      } catch (error) {
        console.error("Error:", error.message);
      }
      break;
    case "3":
      try {
        console.log("-DELETE SENSOR-");
        const id = question("Write the id of the sensor to delete it: ");
        await sensorController.deleteSensor(id);
      } catch (error) {
        console.error("Error:", error.message);
      }
      break;
    case "4":
      try {
        console.log("-All SENSORS-");
        console.log("xd", await sensorController.findAllSensors());
      } catch (error) {
        console.error("Error:", error.message);
      }
      break;
    case "5":
      try {
        console.log("-Sensor-");
        const search = question(
          "Write the name or id of the sensor: "
        );
        const sensor = await sensorController.findOneSensor(search);
        if (sensor !== undefined) console.log(sensor);
      } catch (error) {
        console.error("Error:", error.message);
      }
      break;
    case "6":
      running = false;
      mongoose.disconnect();
      break;

    default:
      console.log("Please, write a number from the menu");
  }
  question("\n- Enter to continue -");
}
