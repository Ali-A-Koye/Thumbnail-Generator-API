import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import { controllerLoader } from "../import/controller.import";

declare module "fastify" {
  interface FastifyInstance {
    controller: {
      [key: string]: {
        [key: string]: (req: FastifyRequest, reply: FastifyReply) => Promise<any>;
      }
    };
  }
}

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
  let c = await controllerLoader();

  fastify.decorate("controller", c);

  next();
};

export default fp(pluginCallback, {
  dependencies: ["config"],
});
