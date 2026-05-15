import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Task, type TaskRecord } from "../models/Task.js";

export class TaskRepository {
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly dataFilePath = path.resolve(this.dataDir, "tasks.json");

  public list(): Task[] {
    const records = this.readRecords();
    return records.map((record) => Task.fromRecord(record));
  }

  public save(tasks: Task[]): void {
    const records = tasks.map((task) => task.toRecord());
    this.writeRecords(records);
  }

  private ensureDataFile(): void {
    if (!existsSync(this.dataDir)) {
      mkdirSync(this.dataDir, { recursive: true });
    }

    if (!existsSync(this.dataFilePath)) {
      writeFileSync(this.dataFilePath, "[]\n", { encoding: "utf8" });
    }
  }

  private readRecords(): TaskRecord[] {
    this.ensureDataFile();
    const raw = readFileSync(this.dataFilePath, { encoding: "utf8" });
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid tasks.json format: expected an array");
    }

    return parsed as TaskRecord[];
  }

  private writeRecords(records: TaskRecord[]): void {
    this.ensureDataFile();
    const payload = JSON.stringify(records, null, 2);
    writeFileSync(this.dataFilePath, `${payload}\n`, { encoding: "utf8" });
  }
}
