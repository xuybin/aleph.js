import { dim, green, red, yellow } from "./deps.ts";

export type LevelName = "debug" | "info" | "warn" | "error" | "fatal";

export enum Level {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

export class Logger {
  #level: Level = Level.Info;

  get level(): Level {
    return this.#level;
  }

  setLevel(level: LevelName): void {
    switch (level) {
      case "debug":
        this.#level = Level.Debug;
        break;
      case "info":
        this.#level = Level.Info;
        break;
      case "warn":
        this.#level = Level.Warn;
        break;
      case "error":
        this.#level = Level.Error;
        break;
      case "fatal":
        this.#level = Level.Fatal;
        break;
    }
  }

  debug(...args: unknown[]): void {
    if (this.#level <= Level.Debug) {
      console.debug(dim("DEBUG"), ...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.#level <= Level.Info) {
      console.log(green("INFO"), ...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.#level <= Level.Warn) {
      console.warn(yellow("WARN"), ...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.#level <= Level.Error) {
      console.error(red("ERROR"), ...args);
    }
  }

  fatal(...args: unknown[]): void {
    if (this.#level <= Level.Fatal) {
      console.error(red("FATAL"), ...args);
      Deno.exit(1);
    }
  }
}

export default new Logger();
