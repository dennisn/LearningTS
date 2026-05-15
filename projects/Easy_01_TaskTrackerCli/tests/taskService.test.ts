import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { TaskRepository } from "../src/services/TaskRepository.js";
import { TaskService, UsageError } from "../src/services/TaskService.js";

let originalCwd: string;
let sandboxDir: string;

beforeEach(() => {
  originalCwd = process.cwd();
  sandboxDir = mkdtempSync(path.join(tmpdir(), "task-tracker-test-"));
  process.chdir(sandboxDir);
});

function restoreCwdAndCleanup(): void {
  process.chdir(originalCwd);
  rmSync(sandboxDir, { recursive: true, force: true });
}

describe("TaskService", () => {
  it("adds, lists and deletes tasks with persistence", () => {
    try {
      const service = new TaskService(new TaskRepository());

      const created = service.addTask("Pay bills", "Pay electricity bill", "2026-06-01T08:30:00Z");
      assert.equal(created.id, 1);
      assert.equal(created.name, "Pay bills");

      const listed = service.listTasks();
      assert.equal(listed.length, 1);
      assert.equal(listed[0].description, "Pay electricity bill");
      assert.equal(listed[0].dueDate.toISOString(), "2026-06-01T08:30:00.000Z");

      const dataFile = path.join(sandboxDir, "data", "tasks.json");
      assert.equal(existsSync(dataFile), true);

      const deleted = service.deleteTask("1");
      assert.equal(deleted.id, 1);
      assert.equal(service.listTasks().length, 0);
    } finally {
      restoreCwdAndCleanup();
    }
  });

  it("throws UsageError for invalid due date and invalid delete id", () => {
    try {
      const service = new TaskService(new TaskRepository());

      assert.throws(
        () => {
          service.addTask("x", "y", "not-a-date");
        },
        (error: unknown) => error instanceof UsageError && error.message.includes("valid datetime"),
      );

      assert.throws(
        () => {
          service.deleteTask("abc");
        },
        (error: unknown) => error instanceof UsageError && error.message.includes("positive integer"),
      );
    } finally {
      restoreCwdAndCleanup();
    }
  });
});
