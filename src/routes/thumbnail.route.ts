import { FastifyPluginAsync } from "fastify";

const thumbnail: FastifyPluginAsync = async (fastify) => {
  fastify.post("/thumbnail", fastify.schema.thumbnail.thumbnailPostSchema , async function () {
    return "thumbnail";
  });

  fastify.get("/thumbnail/:id",fastify.schema.thumbnail.thumbnailGetSchema , async (req, reply): Promise<any> => {
    reply.code(200).send({
      result: "thumbnail 3",
    });
  });
};

export default thumbnail;
