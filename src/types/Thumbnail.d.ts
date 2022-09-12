import { Options } from "amqplib";

type BodyType = {
  image:
    | Buffer
    | {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Buffer;
        size: number;
      }
};

export { BodyType };
