import { randomBytes } from "crypto";

export type TransactionStatus = "PROCESSING" | "DONE";

export class Transaction {
  public readonly id: string;
  public status: TransactionStatus;

  public constructor() {
    this.id = randomBytes(8).toString("hex");
    this.status = "PROCESSING";
  }
}
