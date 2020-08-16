import {
  OnQueueActive,
  OnQueueError,
  OnQueueWaiting,
  OnQueueStalled,
  OnQueueCompleted,
  OnQueueFailed
} from "@nestjs/bull";
import { Job } from "bull";

export class BaseProcessor {
  constructor(private name: string) {}
  @OnQueueError()
  onQueueError(error: Error): void {
    console.log("OnQueueError", this.name, error);
  }
  @OnQueueWaiting()
  onQueueWaiting(jobId: number | string): void {
    console.log("onQueueWaiting", this.name, jobId);
  }
  @OnQueueActive()
  onQueueActive(job: Job): void {
    console.log("onQueueActive", this.name, job.data);
  }
  @OnQueueStalled()
  onQueueStalled(job: Job): void {
    console.log("onQueueStalled", this.name, job.data);
  }
  @OnQueueCompleted()
  onQueueCompleted(job: Job, result: unknown): void {
    console.log("onQueueCompleted", this.name, job.data, result);
  }
  @OnQueueFailed()
  onQueueFailed(job: Job, error: Error): void {
    console.log("onQueueFailed", this.name, job.data, error);
  }
}
