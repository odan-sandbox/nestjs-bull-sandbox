import { Controller, Post, Get, HttpCode, Inject, Param } from "@nestjs/common";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { Transaction } from "./domain/transaction";
import { TransactionRepository } from "./domain/transaction.repository";

// Controller だけど use case 層的な...
// どうだろう？
@Controller()
export class AppController {
  constructor(
    @InjectQueue("transaction") private transactionQueue: Queue,
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository
  ) {}
  @Post("/transaction")
  @HttpCode(201)
  async createTx(): Promise<{ transaction: Transaction }> {
    const transaction = new Transaction();
    await this.transactionQueue.add(transaction);
    await this.transactionRepository.save(transaction);
    return { transaction };
  }

  @Get("/transaction/:id")
  @HttpCode(201)
  async getTx(@Param("id") id: string): Promise<{ transaction: Transaction }> {
    const transaction = await this.transactionRepository.fetch(id);
    return { transaction };
  }
}
