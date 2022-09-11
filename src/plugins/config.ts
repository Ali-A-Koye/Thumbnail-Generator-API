import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      [key: string]: string;
    };
  }
}

export default fp(async (fastify) => {
  const schema = {
    type: "object",
    required: ["PORT","RABBITMQ_URL"],
    properties: {
      PORT: {
        type: "string",
        default: 3000,
      },
      RABBITMQ_URL:{
        type: "string",
        default: "amqp://localhost",
      },
      MONGO_URI:{
        type: "string",
        default: "http://localhost",
      },
      UPLOADER_QUEUE_NAME:{
        type: "string",
        default: "uploader",
      },
      UPLOADER_EXCHANGE_NAME:{
        type: "string",
        default: "uploaderExchange",
      }
    },
  };

  const options = {
    dotenv: {
      path: `${__dirname}/../../.env`,
    },
    confKey: "config", 
    schema: schema,
  };

  fastify.register(fastifyEnv, options).ready((err) => {
    if (err) console.error(err);
  });
},{
    name: "config"
});
