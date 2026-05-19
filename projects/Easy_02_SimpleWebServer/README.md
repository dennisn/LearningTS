# Simple Web Server

A simple webserver, that will say "Hello World" if run without any argument. If arguments are supplied, then will say "Hello " + supplied_arguments

## Plan: TypeScript Simple Web Server

Build a minimal TypeScript Node web server that follows the README baseline and your choices: Node http, port 3000, arguments joined with spaces, plus dynamic query override support. The server will use startup args as default greeting, and request query values can override per request.

### Steps

#### Phase 1: Scaffolding

1. Create package.json with scripts for install/build/start and TypeScript runtime flow to dist/index.js.
2. Add tsconfig.json with strict settings, Node-compatible target/module, src as rootDir, and dist as outDir.
3. Create src/index.ts as the initial single entry point.

#### Phase 2: Behavior implementation

1. Start HTTP server with Node built-in http module on port 3000.
2. Parse startup arguments from process.argv and compute default greeting:
3. No args → Hello World.
4. Args present → Hello plus args joined with spaces.
5. Parse request query params on every request and apply override:
6. If query provides name values, respond with Hello plus those values joined by spaces.
7. Otherwise respond with the startup default greeting.
8. Return plain-text HTTP 200 for all routes in this simple version.

#### Phase 3: Docs and usability

1. Update README to describe both behaviors (startup default + query override), run commands, and sample requests.
2. Add a short note for port conflict troubleshooting.

#### Phase 4: Validation

1. Verify compile output exists and server starts correctly.
2. Validate no-arg, startup-arg, query-override, and fallback behavior.
3. Validate repeated requests remain stable.

## Implementation

Behavior:

- If started with no CLI arguments, it responds with `Hello World`.
- If started with CLI arguments, it responds with `Hello <joined arguments>`.
- You can override per request using query params: `?name=Alice&name=Bob`.

## Setup

```bash
npm install
npm run build
```

## Run

Without startup arguments:

```bash
npm start
```

With startup arguments:

```bash
npm start -- Alice Bob
```

The server runs on `http://localhost:3000`.

## Examples

Default response:

```bash
curl "http://localhost:3000/"
```

Query override response:

```bash
curl "http://localhost:3000/?name=Charlie"
curl "http://localhost:3000/?name=Charlie&name=Delta"
```

## Troubleshooting

If port `3000` is already in use, stop the process using that port and restart the server.
