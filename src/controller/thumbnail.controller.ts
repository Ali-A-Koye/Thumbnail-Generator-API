import { FastifyReply, FastifyRequest } from "fastify";
import { BodyType } from "../types/Thumbnail";

const postThumbnail = async (req: FastifyRequest, reply: FastifyReply) => {
  const body: BodyType = req.body as BodyType;
  let imageBuffer: Buffer;

  if (body.image instanceof Buffer) {
    imageBuffer = body.image;
  } else if (body.image) {
    imageBuffer = body.image.buffer;
  } else {
    return reply.status(400).send({
      message: "Image is required",
    });
  }


  const fastify = req.server;

  fastify.amqp.publish(fastify.uploader.channel, {
    exchangeName: fastify.config.UPLOADER_EXCHANGE_NAME,
    routingKey: fastify.config.UPLOADER_QUEUE_NAME,
    message: imageBuffer,
    queue: fastify.config.UPLOADER_QUEUE_NAME,
  });

  reply.code(200).send({ message: "Thanks , Thumbnail processing" });
};

export default {
  postThumbnail,
};
