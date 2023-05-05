import sensorDataModel from "../models/sensorData.model";


export default class sensorController {

    static async get(req, res) {
        try {
            const data = await sensorDataModel.find({ sensorId: "sensor/1" });
            // console.log("data ::", data)
            res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, "Sensor data get sucessfully", data, []));


        } catch (err) {
            console.log("Error :-", err);
            res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, "Internal server error ", [], err));
        }
    }


}