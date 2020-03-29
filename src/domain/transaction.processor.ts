import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { Transaction } from "./transaction";
import { Inject } from "@nestjs/common";
import { TransactionRepository } from "./transaction.repository";

@Processor("transaction")
export class TransactionProcessor {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository
  ) {}
  @Process()
  async process(job: Job<Transaction>): Promise<void> {
    const tx = job.data;
    console.log("process", tx);

    await new Promise(resolve => {
      setTimeout(() => resolve(), 5000);
    });

    tx.status = "DONE";
    console.log("done", tx);
    await this.transactionRepository.save(tx);
  }
}
