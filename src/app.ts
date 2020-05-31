import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import morgan from "morgan";

import { AppModule } from "./app.module";

process.on("unhandledRejection", reason => {
  console.error(reason);
  process.exit(1);
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(morgan("dev"));

  const configService = app.get(ConfigService);
  console.log(configService.get("REDIS_PORT"));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
