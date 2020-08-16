import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { Transaction } from "./transaction";
import { Inject } from "@nestjs/common";
import { TransactionRepository } from "./transaction.repository";
import { BaseProcessor } from "../base.processor";

@Processor("transaction")
export class TransactionProcessor extends BaseProcessor {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository
  ) {
    super(TransactionProcessor.name);
  }
  @Process()
  async process(job: Job<Transaction>): Promise<void> {
    const tx = job.data;
    console.log("process", tx, process.env.PORT);

    await new Promise(resolve => {
      setTimeout(() => resolve(), 5000);
    });

    tx.status = "DONE";
    console.log("done", tx);
    await this.transactionRepository.save(tx);
  }
}
