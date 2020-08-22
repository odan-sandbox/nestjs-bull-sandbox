import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TransactionRepository } from "./domain/transaction.repository";
import { JobModule } from "./job.module";

@Module({
  imports: [JobModule.registerQueueAsync()],
  controllers: [AppController],
  providers: [TransactionRepository]
})
export class AppModule {}
