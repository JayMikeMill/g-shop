import "./config/config";
import "./utils/aliases";
import http from "http";
import app from "./app";

let currentApp = app;

const PORT =
  Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 8080;

const server = http.createServer((req, res) => currentApp(req, res));

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
