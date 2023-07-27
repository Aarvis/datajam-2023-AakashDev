import { WebSocket } from "ws";
import { execSync } from "child_process";

const BASE_URL = "ws://localhost:8080";

const SERIES_ID = 2579089;

const WS_URL = `${BASE_URL}/${SERIES_ID}`;

const socket = new WebSocket(WS_URL);

socket.onopen = () => {
  console.log("Connected to WebSocket server.");
};

socket.onclose = (event) => {
  console.log("Disconnected from WebSocket server: ", event.reason);
};

socket.onmessage = (event) => {
  const object = JSON.parse(event.data);

  console.dir(object, { depth: null, colors: true });

  execSync("sleep 60");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
