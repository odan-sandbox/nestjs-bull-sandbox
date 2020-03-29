import { Transaction } from "./transaction";

export class TransactionRepository {
  private readonly store: { [id: string]: Transaction } = {};
  async save(tx: Transaction): Promise<Transaction> {
    this.store[tx.id] = tx;
    return Promise.resolve(tx);
  }

  async fetch(id: Transaction["id"]): Promise<Transaction> {
    return Promise.resolve(this.store[id]);
  }
}
