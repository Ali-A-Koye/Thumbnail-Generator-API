import { Options } from "amqplib";

type Publish = {
  exchangeName: string;
  queue: string;
  message: string; 
  queueOptions?: Options.AssertQueue;
  routingKey?: string;
  options?: Options.Publish;
};

export default Publish;
