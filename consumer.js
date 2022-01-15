const { config } = require('dotenv')
config();

const { connect } = require('amqplib')

const URL = `amqp://${process.env.USER}:${process.env.PASSWORD}@${process.env.IP}:${process.env.PORT}/${process.env.vHOST}`;
const queue_name = "rushi-queue";

const consumer = async () => {
    try {
        const channel = await (await connect(URL)).createChannel();
        channel.consume(queue_name, (mssg) => {
            console.log("Message ",mssg.content.toString());
            channel.ack(mssg);
        });
    }
    catch (error){
        console.log(error);
    }
}
consumer();