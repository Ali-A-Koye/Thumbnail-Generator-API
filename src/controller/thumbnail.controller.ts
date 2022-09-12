import { FastifyReply, FastifyRequest } from "fastify";

const postThumbnail = async (req: FastifyRequest, reply: FastifyReply) => {
  const fastify = req.server;

  fastify.amqp.publish(fastify.uploader.channel, {
    exchangeName: fastify.config.UPLOADER_EXCHANGE_NAME,
    routingKey: fastify.config.UPLOADER_QUEUE_NAME,
    message: "Hello World",
    queue: fastify.config.UPLOADER_QUEUE_NAME,
  });

  reply.code(200).send({ message: "Thanks , Thumbnail processing" });
};

export default {
  postThumbnail,
};
