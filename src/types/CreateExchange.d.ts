import { Options } from "amqplib";

type CreateExchange = {
  name: string;
  type: string;
  options: Options.AssertExchange;
};

export default CreateExchange;
