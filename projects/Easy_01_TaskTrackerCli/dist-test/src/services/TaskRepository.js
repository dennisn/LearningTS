"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const Task_js_1 = require("../models/Task.js");
class TaskRepository {
    dataDir = node_path_1.default.resolve(process.cwd(), "data");
    dataFilePath = node_path_1.default.resolve(this.dataDir, "tasks.json");
    list() {
        const records = this.readRecords();
        return records.map((record) => Task_js_1.Task.fromRecord(record));
    }
    save(tasks) {
        const records = tasks.map((task) => task.toRecord());
        this.writeRecords(records);
    }
    ensureDataFile() {
        if (!(0, node_fs_1.existsSync)(this.dataDir)) {
            (0, node_fs_1.mkdirSync)(this.dataDir, { recursive: true });
        }
        if (!(0, node_fs_1.existsSync)(this.dataFilePath)) {
            (0, node_fs_1.writeFileSync)(this.dataFilePath, "[]\n", { encoding: "utf8" });
        }
    }
    readRecords() {
        this.ensureDataFile();
        const raw = (0, node_fs_1.readFileSync)(this.dataFilePath, { encoding: "utf8" });
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            throw new Error("Invalid tasks.json format: expected an array");
        }
        return parsed;
    }
    writeRecords(records) {
        this.ensureDataFile();
        const payload = JSON.stringify(records, null, 2);
        (0, node_fs_1.writeFileSync)(this.dataFilePath, `${payload}\n`, { encoding: "utf8" });
    }
}
exports.TaskRepository = TaskRepository;
