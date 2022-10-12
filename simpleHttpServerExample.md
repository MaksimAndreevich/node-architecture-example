import http from "http"; // Standard library

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!");
});

server.listen(port, host, () =>
  console.log(`Server is work on ${host}:${port} or http://localhost:${port}`)
);
