import { FastifyReply, FastifyRequest } from "fastify";

const postThumbnail = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send({ message: "Thanks , Thumbnail processing" });
};

export default {
  postThumbnail,
};
