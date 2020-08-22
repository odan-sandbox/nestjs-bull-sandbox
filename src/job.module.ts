import { Module, DynamicModule } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ConfigModule, ConfigType } from "@nestjs/config";
import RedisConfig from "./config/redis";
import { TransactionProcessor } from "./domain/transaction.processor";
import { TransactionRepository } from "./domain/transaction.repository";

const configModule = ConfigModule.forRoot({
  load: [RedisConfig]
});

@Module({ imports: [configModule] })
export class JobModule {
  private static createQueueModule(name: string): DynamicModule {
    return BullModule.registerQueueAsync({
      imports: [configModule],
      inject: [RedisConfig.KEY],
      name,
      useFactory(redisConfig: ConfigType<typeof RedisConfig>) {
        return {
          redis: {
            host: redisConfig.host,
            port: redisConfig.port
          }
        };
      }
    });
  }
  static registerQueueAsync(): DynamicModule {
    const queueModule = this.createQueueModule("transaction");
    return {
      ...queueModule,
      providers: [],
      imports: [queueModule],
      exports: [queueModule]
    };
  }
  static registerWorkerAsync(): DynamicModule {
    const queueModule = this.createQueueModule("transaction");
    return {
      ...queueModule,
      providers: [TransactionProcessor, TransactionRepository],
      imports: [queueModule],
      exports: [queueModule]
    };
  }
}
