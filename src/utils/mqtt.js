import mqtt from 'mqtt';
import sensorDataModel from '../app/models/sensorData.model';
const options = {
    // clientId: 'dharmesh',
    // Username: 'cedalo',
    // Password: '0dfTYEF90nAd9kNK8IEr'
};
const client = mqtt.connect('mqtt://test.mosquitto.org', options);


client.on('connect', () => {
    console.log("Connection established successfully!");
    client.subscribe("sensor/1")
});

// client.on('close', () => {
//     console.log("connection closed");
// })

client.on('error', (error) => {
    console.log("error :-", error);
})

client.on("message", (topic, data) => {
    try {
        console.log("topic :", topic)
        console.log("data", JSON.parse(data))
        const topicData = JSON.parse(data);
        sensorDataModel.create({
            sensorId: topic,
            location: {
                coordinates: [topicData.long, topicData.lati]
            }
        })
    } catch (err) {
        console.log("error ::", err)
    }

})