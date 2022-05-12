import { IOC } from "dic-ioc";

export class Container {
  private static _instance: Container;
  private ioc: IOC;

  private constructor() {
    this.ioc = new IOC();
  }

  public get<T>(service: string): T {
    return this.ioc.get(service);
  }

  public register(service: string, injector: (c: IOC) => {}): void {
    this.ioc.setService(service, injector);
  }

  public static getInstance(): Container {
    if (!Container._instance) {
      Container._instance = new Container();
    }
    return Container._instance;
  }
}
