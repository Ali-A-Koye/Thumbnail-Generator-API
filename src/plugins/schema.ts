import fp from "fastify-plugin";
import { FastifyPluginCallback, RouteShorthandOptions } from "fastify";
import filesLoader from "../utils/files-loader";

declare module "fastify" {
  interface FastifyInstance {
    schema: {
      [key: string]: RouteShorthandOptions;
    };
  }
}

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
  const schemas = await filesLoader("/../schema/*.schema");

  fastify.decorate("schema", schemas);

  next();
};

export default fp(pluginCallback, {
  dependencies: ["config"],
});
