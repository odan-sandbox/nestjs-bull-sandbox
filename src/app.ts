import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

process.on("unhandledRejection", reason => {
  console.error(reason);
  process.exit(1);
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log(configService.get("REDIS_PORT"));

  await app.listen(3000);
}
bootstrap();
