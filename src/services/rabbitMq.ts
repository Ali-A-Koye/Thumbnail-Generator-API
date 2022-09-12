import { Channel, Connection } from "amqplib";
import CreateExchange from "../types/CreateExchange";
import Publish from "../types/Publish";
import Consumer from "../types/Consumer";

const createChannel = async (connection: Connection) => {
  const channel = await connection.createChannel();
  return channel;
};

const createExchange = async (channel: Channel, data: CreateExchange) => {
  const { name, type, options } = data;
  let exchange = await channel.assertExchange(name, type, options);
  return exchange;
};

const publish = async (channel: Channel, data: Publish) => {
  let { exchangeName, routingKey, queue, queueOptions, message, options } =
    data;

  routingKey = routingKey || "";
  queueOptions = queueOptions || {};
  options = options || {};

  await channel.assertQueue(queue, queueOptions);
  channel.bindQueue(queue, exchangeName, routingKey);
  channel.publish(exchangeName, routingKey, Buffer.from(message), options);
};


const consumerSubscribe = async (
  channel: Channel,
  data: Consumer,
  callback: Function
) => {
  const { queueName, exchangeName, queueOptions, routingKey, bindOptions } =
    data; 

  await channel.assertQueue(queueName, queueOptions);
  channel.bindQueue(queueName, exchangeName, routingKey, bindOptions);
  channel.consume(queueName, (msg) => callback(msg));
};

export default {
  createExchange,
  createChannel,
  publish,
  consumerSubscribe,
};
