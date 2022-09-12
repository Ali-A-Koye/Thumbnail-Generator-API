import * as Joi from "joi";
import { RouteShorthandOptions } from "fastify";
import ufp from "fastify-universal-file-parser";

const thumbnailPostSchema: RouteShorthandOptions = {
  schema: {
    body: Joi.object()
      .keys({
        image: Joi.required().invalid("error"),
      })
      .required(),
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      400: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
  preValidation: async (request, reply) => await ufp("image", request),
  validatorCompiler: (fields: any) => {
    return (data: any) => fields.schema.validate(data);
  },
};

const thumbnailGetSchema: RouteShorthandOptions = {
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
};

export default {
  thumbnailPostSchema,
  thumbnailGetSchema,
};
