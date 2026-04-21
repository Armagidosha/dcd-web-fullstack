import { resolve } from "node:path";
import { destination as dest, multistream, pino, transport } from "pino";

const isDev = process.env.NODE_ENV === "development";
const logPath = resolve(__dirname, "../logs/app.log");

const fileStream = dest({
  dest: logPath,
  mkdir: true,
  sync: false,
});

const prettyStream = transport({
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
  },
});

const streams = isDev
  ? [{ stream: prettyStream }, { stream: fileStream }]
  : [{ stream: fileStream }];

export const logger = pino(
  {
    level: isDev ? "debug" : "info",
  },
  multistream(streams),
);
