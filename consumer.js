const { config } = require('dotenv')
config();

const { connect } = require('amqplib')

const URL = `amqp://${process.env.USER}:${process.env.PASSWORD}@${process.env.IP}:${process.env.PORT}/${process.env.vHOST}`;
const queue_name = "rushi-queue";

const consumer = async () => {
    try {
        const channel = await (await connect(URL)).createChannel();
        channel.consume(queue_name, (mssg) => {
            channel.ack(mssg);
            console.log(`Message ${mssg.content.toString()}`);
        });
    }
    catch (error){
        console.log(error);
        process.exit(-1);
    }
}
consumer();