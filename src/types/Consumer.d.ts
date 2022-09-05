import { Options } from "amqplib";

type Consumer = {
  exchangeName: string;
  queueName: string;
  queueOptions: Options.AssertQueue;
  routingKey: string;
  bindOptions: Options.BindQueue;
  options?: Options.Publish;
};

export default Consumer;
