import { Events } from "../constants/Events";

export abstract class EventEmitter {
  abstract on<T>(event: Events, listener: (args: T) => void): void;
  abstract emit(event: Events, ...args: any[]): void;
}
