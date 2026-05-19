import assert from "node:assert/strict";
import test from "node:test";
import { buildStartupGreeting, resolveGreeting } from "../greeting.js";

test("buildStartupGreeting returns Hello World with no args", () => {
  assert.equal(buildStartupGreeting([]), "Hello World");
});

test("buildStartupGreeting joins args with spaces", () => {
  assert.equal(buildStartupGreeting(["Alice", "Bob"]), "Hello Alice Bob");
});

test("resolveGreeting falls back to startup greeting when no name query exists", () => {
  const greeting = resolveGreeting("/", "localhost:3000", 3000, "Hello Alice Bob");
  assert.equal(greeting, "Hello Alice Bob");
});

test("resolveGreeting uses single name query override", () => {
  const greeting = resolveGreeting(
    "/?name=Charlie",
    "localhost:3000",
    3000,
    "Hello Alice Bob",
  );
  assert.equal(greeting, "Hello Charlie");
});

test("resolveGreeting joins repeated name query parameters", () => {
  const greeting = resolveGreeting(
    "/?name=Echo&name=Foxtrot",
    "localhost:3000",
    3000,
    "Hello Alice Bob",
  );
  assert.equal(greeting, "Hello Echo Foxtrot");
});

test("resolveGreeting ignores empty name query values", () => {
  const greeting = resolveGreeting(
    "/?name=&name=George",
    "localhost:3000",
    3000,
    "Hello Alice Bob",
  );
  assert.equal(greeting, "Hello George");
});