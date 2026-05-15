import { Task } from "../models/Task.js";
import { TaskRepository } from "./TaskRepository.js";

export class UsageError extends Error {}

export class TaskService {
  public constructor(private readonly repository: TaskRepository) {}

  public listTasks(): Task[] {
    return this.repository.list();
  }

  public addTask(nameInput: string, descriptionInput: string, dueDateInput: string): Task {
    const name = nameInput.trim();
    const description = descriptionInput.trim();

    if (name.length === 0) {
      throw new UsageError("Task name is required.");
    }

    if (description.length === 0) {
      throw new UsageError("Task description is required.");
    }

    const dueDate = new Date(dueDateInput);
    if (Number.isNaN(dueDate.getTime())) {
      throw new UsageError("dueDate must be a valid datetime string.");
    }

    const tasks = this.repository.list();
    const nextId = this.getNextId(tasks);
    const task = new Task(nextId, name, description, dueDate);
    tasks.push(task);
    this.repository.save(tasks);
    return task;
  }

  public deleteTask(taskIdInput: string): Task {
    const taskId = Number.parseInt(taskIdInput, 10);

    if (Number.isNaN(taskId) || taskId <= 0) {
      throw new UsageError("Task id must be a positive integer.");
    }

    const tasks = this.repository.list();
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index < 0) {
      throw new UsageError(`Task with id ${taskId} does not exist.`);
    }

    const [deletedTask] = tasks.splice(index, 1);
    this.repository.save(tasks);
    return deletedTask;
  }

  private getNextId(tasks: Task[]): number {
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    return maxId + 1;
  }
}
