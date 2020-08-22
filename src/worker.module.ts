import { Module } from "@nestjs/common";
import { JobModule } from "./job.module";

@Module({
  imports: [JobModule.registerWorkerAsync()]
})
export class WorkerModule {}
