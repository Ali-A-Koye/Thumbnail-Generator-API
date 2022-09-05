import { Model } from "mongoose";
import * as Mongoose from "mongoose";
import { imageModel, Image } from "../model/Image.model";

import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    db: {
      [key: string]: Model<any>;
    };
  }
}
export interface Models {
  Image: Model<imageModel>;
}

export interface Db {
  models: Models;
}

const pluginCallback: FastifyPluginCallback = async (fastify, options, next) => { 
  Mongoose.connection.on("connected", () => {
    fastify.log.info("Db Connected");
  });

  Mongoose.connection.on("disconnected", () => {
    fastify.log.info("Db Disconnected");
  });
 
  await Mongoose.connect(fastify.config.MONGO_URI);

  const models: Models = {
    Image: Image
  };

  fastify.decorate("db", { models });

  next();
}


export default fp(pluginCallback,{
  dependencies: ["config"]
});