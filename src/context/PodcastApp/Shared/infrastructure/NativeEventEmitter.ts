import { EventEmitter } from "stream";
import { Events } from "../domain/constants/Events";
import { EventEmitter as AbstractEventEmitter } from "../domain/interfaces/EventEmitter";

export class NativeEventEmitter implements AbstractEventEmitter {
  private _eventEmitter: EventEmitter;

  constructor() {
    this._eventEmitter = new EventEmitter();
  }

  on(event: string, listener: (...args: any[]) => void): void {
    this._eventEmitter.on(event, listener);
  }

  emit(event: Events, ...args: any[]): void {
    this._eventEmitter.emit(event, ...args);
  }
}
