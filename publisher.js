const { config } = require('dotenv')
config();

const { connect } = require('amqplib')

const URL = `amqp://${process.env.USER}:${process.env.PASSWORD}@${process.env.IP}:${process.env.PORT}/${process.env.vHOST}`;
const queue_name = "rushi-queue";

const run = async () => {
    try{
        const channel = await (await connect(URL)).createChannel();
        await channel.assertQueue(queue_name)
        const send = channel.sendToQueue(
            queue_name,
            Buffer.from("Greeting Message from Rushi")
        );
        console.log(send);
        process.exit(0);
    }
    catch (error){
        console.error(error)
        process.exit(-1);
    }
}

run();

