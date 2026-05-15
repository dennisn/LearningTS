"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    id;
    name;
    description;
    dueDate;
    constructor(id, name, description, dueDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }
    toRecord() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            dueDate: this.dueDate.toISOString(),
        };
    }
    static fromRecord(record) {
        const dueDate = new Date(record.dueDate);
        if (Number.isNaN(dueDate.getTime())) {
            throw new Error(`Invalid dueDate for task id ${record.id}`);
        }
        return new Task(record.id, record.name, record.description, dueDate);
    }
}
exports.Task = Task;
