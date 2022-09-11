import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import multer from 'fastify-multer'

const pluginCallback: FastifyPluginCallback = async (
  fastify,
  options,
  next
) => {
 
fastify.register(multer.contentParser);
  next();
};

export default fp(pluginCallback);
