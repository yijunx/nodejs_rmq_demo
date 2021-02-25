const amqp = require("amqplib");

const msg = {number: process.argv[2]}
connect();
async function connect() {
    try {
        // tcp connection
        const connection = await amqp.connect("amqp://rabbitmq:5672")
        // create channel
        const channel = await connection.createChannel();
        // get a queue
        const result = await channel.assertQueue("jobs");
        // send something
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))

        console.log(`job sent successfully ${msg.number}`)
    }
    catch (ex) {
        console.log(ex)
    }
}