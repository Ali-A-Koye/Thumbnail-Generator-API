import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
  // console.log(fastify.amqp)
 
  next();
};

export default fp(pluginCallback,{
    dependencies: ["config","rabbitMq"]
});
