import { Controller, Get, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import RedisConfig from "./config/redis";

@Controller()
export class AppController {
  constructor(
    @Inject(RedisConfig.KEY)
    private redisConfig: ConfigType<typeof RedisConfig>
  ) {
    console.log("Poyo");
    console.log(this.redisConfig);
  }
  @Get()
  home(): string {
    return "hello";
  }
}
