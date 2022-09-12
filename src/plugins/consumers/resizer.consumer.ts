import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import resizerHandler from "../../handlers/resizer";
import * as amqplib from "amqplib";
import { Message } from "amqplib";

declare module "fastify" {
  interface FastifyInstance {
    resizer: {
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
    name: fastify.config.RESIZER_EXCHANGE_NAME,
    type: "direct",
    options: {
      durable: true,
    },
  });

  await fastify.amqp.consumerSubscribe(
    channel,
    {
      queueName: fastify.config.RESIZER_QUEUE_NAME,
      exchangeName: fastify.config.RESIZER_EXCHANGE_NAME,
      queueOptions: {
        durable: true,
      },
      routingKey: fastify.config.RESIZER_QUEUE_NAME,
      bindOptions: {
        durable: true,
      },
    },
    (msg:Message) => resizerHandler(msg, fastify)
  );

  fastify.decorate("resizer", {channel});

  next();
};

export default fp(pluginCallback, {
  dependencies: ["config", "rabbitMq"],
});
