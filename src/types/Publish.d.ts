import { Options } from "amqplib";

type Publish = {
  exchangeName: string;
  queue: string;
  message: Buffer; 
  queueOptions?: Options.AssertQueue;
  routingKey?: string;
  options?: Options.Publish;
};

export default Publish;
