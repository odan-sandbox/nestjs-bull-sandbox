import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import supertest from "supertest";

import { AppModule } from "./app.module";
import { Transaction } from "./domain/transaction";

describe("app", (): void => {
  describe("add", (): void => {
    it("should be correct", (): void => {
      expect(32 + 10).toBe(42);
    });
  });
});

jest.setTimeout(10000);

describe("transaction", (): void => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe("GET /health", () => {
    let server: supertest.Test;
    let response: supertest.Response;

    beforeEach(async () => {
      server = supertest(app.getHttpServer()).get("/health");
      response = await server;
    });

    it("should be return ok", () => {
      expect(response.status).toBe(200);
      expect(response.body.ok).toBeTruthy();
    });
  });

  describe("POST /transaction", () => {
    let server: supertest.Test;
    let response: supertest.Response;
    let transaction: Transaction;

    beforeEach(async () => {
      server = supertest(app.getHttpServer()).post("/transaction");
      response = await server;
      transaction = response.body.transaction;
    });

    it.only("should be return transaction", async () => {
      expect(response.status).toBe(201);
      expect(transaction).toBeDefined();
      console.log(transaction);

      expect(transaction.status).toBe("PROCESSING");

      await new Promise(resolve => setTimeout(resolve, 9000));
      // jest.advanceTimersByTime(9000);

      response = await supertest(app.getHttpServer()).get(
        `/transaction/${transaction.id}`
      );

      expect(response.body.transaction.status).toBe("DONE");
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
