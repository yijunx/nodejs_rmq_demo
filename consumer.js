const amqp = require("amqplib");


connect();
async function connect() {
    try {
        // tcp connection (different connection than the publisher guy)
        const connection = await amqp.connect("amqp://rabbitmq:5672");
        // create channel
        const channel = await connection.createChannel();
        // get a queue
        // const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`received job with input :${input.number}`);
            if (input.number == 7) 
            // the criteria of the job is done
            // then means can get the task out of the queue
                channel.ack(message);
        })

        console.log("waiting for messages...");

    }
    catch (ex) {
        console.log(ex)
    }
}