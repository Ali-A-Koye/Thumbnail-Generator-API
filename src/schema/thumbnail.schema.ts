import * as Joi from "joi";
import { RouteShorthandOptions } from "fastify";

const thumbnailPostSchema: RouteShorthandOptions = {
  schema: {
    body: Joi.object()
      .keys({
        image: Joi.string().required(),
      })
      .required(),
    response: {
      200: {
        type: "string",
      },
    },
  }
};

const thumbnailGetSchema: RouteShorthandOptions =  {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "array",
          },
        },
      },
    },
  },
}

export default {
  thumbnailPostSchema,
  thumbnailGetSchema
};
