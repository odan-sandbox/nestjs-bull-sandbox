import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

process.on("unhandledRejection", reason => {
  console.error(reason);
  process.exit(1);
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
