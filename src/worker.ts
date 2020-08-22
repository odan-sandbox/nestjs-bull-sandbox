import { NestFactory } from "@nestjs/core";

import { WorkerModule } from "./worker.module";

process.on("unhandledRejection", reason => {
  console.error(reason);
  process.exit(1);
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(WorkerModule);

  await app.init();
}
bootstrap();
