import { AutoloadPluginOptions } from "@fastify/autoload";

type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

export default AppOptions;
