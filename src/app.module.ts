import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { AppController } from "./app.controller";
import RedisConfig from "./config/redis";
import { TransactionProcessor } from "./domain/transaction.processor";
import { TransactionRepository } from "./domain/transaction.repository";

const configModule = ConfigModule.forRoot({
  load: [RedisConfig]
});

@Module({
  imports: [
    configModule,
    BullModule.registerQueueAsync({
      imports: [configModule],
      inject: [RedisConfig.KEY],
      name: "transaction",
      useFactory(redisConfig: ConfigType<typeof RedisConfig>) {
        return {
          redis: {
            host: redisConfig.host,
            port: redisConfig.port
          }
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [TransactionProcessor, TransactionRepository]
})
export class AppModule {}
