import { FastifyReply, FastifyRequest } from "fastify";

const postThumbnail = async (req: FastifyRequest, reply: FastifyReply) => {

  console.log((req.body as any).profile_image)
  reply.code(200).send({ message: "Thanks , Thumbnail processing" });
};

export default {
  postThumbnail,
};
