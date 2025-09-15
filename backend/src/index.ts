import http from "http";
import app from "./app";

let currentApp = app;

const PORT = process.env.SERVER_PORT || 5000;

const server = http.createServer((req, res) => currentApp(req, res));

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});