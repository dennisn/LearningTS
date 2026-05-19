import { createServer } from "node:http";
import { buildStartupGreeting, resolveGreeting } from "./greeting.js";

const port = 3000;
const startupArgs = process.argv.slice(2);
const startupGreeting = buildStartupGreeting(startupArgs);

const server = createServer((req, res) => {
  const greeting = resolveGreeting(req.url, req.headers.host, port, startupGreeting);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(greeting);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Default greeting: ${startupGreeting}`);
});
