import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {};
  }
}

export default fp(async (fastify) => {
  const schema = {
    type: "object",
    required: ["PORT"],
    properties: {
      PORT: {
        type: "string",
        default: 3000,
      },
      RABBITMQ_URL:{
        type: "string",
        default: "amqp://localhost",
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
    // console.log(fastify.config); 
  });
},{
    name: "config"
});
