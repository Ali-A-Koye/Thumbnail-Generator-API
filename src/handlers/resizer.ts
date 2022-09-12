import { Message } from "amqplib";
import { promises as fs } from "fs";
import * as sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { FastifyInstance } from "fastify";
const handler = async (msg: Message, fastify: FastifyInstance) => {
  let imageBuffer = await fs.readFile(msg.content.toString());

  let resizedImage = await sharp(imageBuffer)
    .resize({ width: 100, height: 100 })
    .toBuffer();
  const dirArray: string[] = msg.content.toString().split("/");
  dirArray.pop();
  const dir: string = dirArray.join("/") + "/" + uuidv4() + "-resized.png";

  await fs.writeFile(`${dir}`, resizedImage);

  fastify.resizer.channel.ack(msg);
};

export default handler;
