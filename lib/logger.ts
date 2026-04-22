import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import pino, { transport as trsp } from "pino";

const logDir = resolve(process.cwd(), "logs");
mkdirSync(logDir, { recursive: true });

const transport = trsp({
  targets: [
    {
      target: "pino-pretty",
      level: "info",
      options: { colorize: true, singleLine: true },
    },
    {
      target: "pino/file",
      options: { destination: `${logDir}/info.log` },
      level: "info",
    },
    {
      target: "pino/file",
      options: { destination: `${logDir}/warn.log` },
      level: "warn",
    },
    {
      target: "pino/file",
      options: { destination: `${logDir}/error.log` },
      level: "error",
    },
  ],
});

export const logger = pino(transport);
