import { FastifyPluginAsync } from "fastify";

const thumbnail: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/thumbnail",
    fastify.schema.thumbnail.thumbnailPostSchema,
    fastify.controller.thumbnail.postThumbnail
  );
};

export default thumbnail;
