import { Message } from "amqplib";
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const handler = async (msg: Message) => {
    const fileSuffix:string = "png"
    const folderDir:string = uuidv4();
    await fs.mkdir(`${__dirname}/../../uploads/${folderDir}`);
    const image:string= `${__dirname}/../../uploads/${folderDir}/${uuidv4()}.${fileSuffix}`;
    await fs.writeFile(`${image}`, msg.content);

    // channel.ack(msg);

}


export default handler;