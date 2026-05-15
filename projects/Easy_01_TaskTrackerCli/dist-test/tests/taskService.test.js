"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_fs_1 = require("node:fs");
const node_os_1 = require("node:os");
const node_path_1 = __importDefault(require("node:path"));
const TaskRepository_js_1 = require("../src/services/TaskRepository.js");
const TaskService_js_1 = require("../src/services/TaskService.js");
let originalCwd;
let sandboxDir;
(0, node_test_1.beforeEach)(() => {
    originalCwd = process.cwd();
    sandboxDir = (0, node_fs_1.mkdtempSync)(node_path_1.default.join((0, node_os_1.tmpdir)(), "task-tracker-test-"));
    process.chdir(sandboxDir);
});
function restoreCwdAndCleanup() {
    process.chdir(originalCwd);
    (0, node_fs_1.rmSync)(sandboxDir, { recursive: true, force: true });
}
(0, node_test_1.describe)("TaskService", () => {
    (0, node_test_1.it)("adds, lists and deletes tasks with persistence", () => {
        try {
            const service = new TaskService_js_1.TaskService(new TaskRepository_js_1.TaskRepository());
            const created = service.addTask("Pay bills", "Pay electricity bill", "2026-06-01T08:30:00Z");
            strict_1.default.equal(created.id, 1);
            strict_1.default.equal(created.name, "Pay bills");
            const listed = service.listTasks();
            strict_1.default.equal(listed.length, 1);
            strict_1.default.equal(listed[0].description, "Pay electricity bill");
            strict_1.default.equal(listed[0].dueDate.toISOString(), "2026-06-01T08:30:00.000Z");
            const dataFile = node_path_1.default.join(sandboxDir, "data", "tasks.json");
            strict_1.default.equal((0, node_fs_1.existsSync)(dataFile), true);
            const deleted = service.deleteTask("1");
            strict_1.default.equal(deleted.id, 1);
            strict_1.default.equal(service.listTasks().length, 0);
        }
        finally {
            restoreCwdAndCleanup();
        }
    });
    (0, node_test_1.it)("throws UsageError for invalid due date and invalid delete id", () => {
        try {
            const service = new TaskService_js_1.TaskService(new TaskRepository_js_1.TaskRepository());
            strict_1.default.throws(() => {
                service.addTask("x", "y", "not-a-date");
            }, (error) => error instanceof TaskService_js_1.UsageError && error.message.includes("valid datetime"));
            strict_1.default.throws(() => {
                service.deleteTask("abc");
            }, (error) => error instanceof TaskService_js_1.UsageError && error.message.includes("positive integer"));
        }
        finally {
            restoreCwdAndCleanup();
        }
    });
});
