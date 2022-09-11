import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import * as amqplib from "amqplib";
import rabbitMQ from "../services/rabbitMq";
import CreateExchange from "../types/CreateExchange";
import Publish from "../types/Publish";
import Consumer from "../types/Consumer";

declare module "fastify" {
  interface FastifyInstance {
    amqp: {
      connection : amqplib.Connection;
      createChannel : (connection: amqplib.Connection) => Promise<amqplib.Channel>;
      createExchange : (channel: amqplib.Channel, data: CreateExchange) => Promise<amqplib.Replies.AssertExchange>;
      publish : (channel: amqplib.Channel, data: Publish) => Promise<boolean>;
      consumerSubscribe : (channel: amqplib.Channel, data: Consumer, callback: Function) => Promise<boolean>;
    };
  }
}

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
  let connection = await amqplib
    .connect(fastify.config.RABBITMQ_URL)
    .then((c) => {
      fastify.log.info("Connected to RabbitMQ");
      return c;
    })
    .catch((err) => {
      fastify.log.error(err);
    });

  fastify.decorate("amqp", {
    connection,
    createChannel: rabbitMQ.createChannel,
    createExchange: rabbitMQ.createExchange,
    publish: rabbitMQ.publish,
    consumerSubscribe: rabbitMQ.consumerSubscribe,
  });

  next();
};

export default fp(pluginCallback, {
  dependencies: ["config"],
  name: "rabbitMq"
});
