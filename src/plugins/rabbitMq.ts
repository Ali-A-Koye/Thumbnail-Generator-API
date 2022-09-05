import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import * as amqplib from "amqplib";

declare module "fastify" {
  interface FastifyInstance {
    amqp: amqplib.Connection;
  }
}

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
  await amqplib
    .connect(fastify.config.RABBITMQ_URL)
    .then(() => {
      fastify.log.info("Connected to RabbitMQ");
    })
    .catch((err) => {
      fastify.log.error(err);
    });

  fastify.decorate("amqp", amqplib);

  next();
};

export default fp(pluginCallback, {
  dependencies: ["config"],
});
