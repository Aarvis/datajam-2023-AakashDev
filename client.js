import { WebSocket } from "ws";
import * as winston from "winston";

const BASE_URL = "ws://localhost:8080";

const SERIES_ID = 2579089;

const WS_URL = `${BASE_URL}/${SERIES_ID}`;

const socket = new WebSocket(WS_URL);

var counter = 0;

socket.onopen = () => {
  console.log("Connected to WebSocket server.");
};

socket.onclose = (event) => {
  console.log("Disconnected from WebSocket server: ", event.reason);
};

socket.onmessage = (event) => {
  counter += 1;

  const object = JSON.parse(event.data);

  const logger = winston.createLogger({
    level: "info",
    transports: [
      new winston.transports.File({
        filename: `events/event_${counter}.log`,
        format: winston.format.prettyPrint(),
      }),
    ],
  });

  logger.info("Event", object);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
