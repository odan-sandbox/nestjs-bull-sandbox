import { registerAs } from "@nestjs/config";
import { ConfigFactory } from "@nestjs/config/dist/interfaces";

export interface Config {
  host: string;
  port: number;
}

const factory: ConfigFactory<Config> = () => {
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  if (!host) {
    throw new Error("missing REDIS_HOST");
  }
  if (!port) {
    throw new Error("missing REDIS_PORT");
  }
  return {
    host,
    port: Number.parseInt(port)
  };
};

export default registerAs("redis", factory);
