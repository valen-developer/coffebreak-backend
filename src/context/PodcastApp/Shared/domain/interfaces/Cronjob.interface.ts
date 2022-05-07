export abstract class CronJob {
  abstract schedule(time: string, callback: () => void): void;
  abstract start(): void;
}
