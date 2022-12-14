import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import uploadHandler from "../../handlers/uploader";
import * as amqplib from "amqplib";
import { Message } from "amqplib";

declare module "fastify" {
  interface FastifyInstance {
    uploader: {
      channel : amqplib.Channel
    }
  }
}

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
  const channel = await fastify.amqp.createChannel(fastify.amqp.connection);
  await fastify.amqp.createExchange(channel, {
    name: fastify.config.UPLOADER_EXCHANGE_NAME,
    type: "direct",
    options: {
      durable: true,
    },
  });

  await fastify.amqp.consumerSubscribe(
    channel,
    {
      queueName: fastify.config.UPLOADER_QUEUE_NAME,
      exchangeName: fastify.config.UPLOADER_EXCHANGE_NAME,
      queueOptions: {
        durable: true,
      },
      routingKey: fastify.config.UPLOADER_QUEUE_NAME,
      bindOptions: {
        durable: true,
      },
    },
    (msg:Message) => uploadHandler(msg, fastify)
  );

  fastify.decorate("uploader", {channel});

  next();
};

export default fp(pluginCallback, {
  dependencies: ["config", "rabbitMq"],
});
