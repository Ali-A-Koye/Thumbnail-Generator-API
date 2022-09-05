import * as Joi from "joi";
import { RouteShorthandOptions } from "fastify";

const thumbnailSchema: RouteShorthandOptions = {
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
  },
  validatorCompiler: (fields: any) => {
    return (data) => fields.schema.validate(data);
  },
};

export default thumbnailSchema;
