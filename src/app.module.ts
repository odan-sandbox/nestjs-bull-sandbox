import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import redisConfig from "./config/redis";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig]
    })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
