import { TaskRepository } from "./services/TaskRepository.js";
import { TaskService, UsageError } from "./services/TaskService.js";

function printUsage(): void {
	console.log("Task Tracker CLI");
	console.log("");
	console.log("Usage:");
	console.log("  npm run start -- list");
	console.log("  npm run start -- add <name> <description> <dueDate>");
	console.log("  npm run start -- delete <id>");
}

function printTasks(commandService: TaskService): void {
	const tasks = commandService.listTasks();

	if (tasks.length === 0) {
		console.log("No tasks found.");
		return;
	}

	console.log("ID | Name | Description | Due Date");
	for (const task of tasks) {
		console.log(`${task.id} | ${task.name} | ${task.description} | ${task.dueDate.toISOString()}`);
	}
}

function main(): void {
	const commandService = new TaskService(new TaskRepository());
	const [command, ...args] = process.argv.slice(2);

	if (!command) {
		printUsage();
		process.exitCode = 1;
		return;
	}

	try {
		switch (command) {
			case "list": {
				if (args.length !== 0) {
					throw new UsageError("list does not accept any arguments.");
				}

				printTasks(commandService);
				return;
			}

			case "add": {
				if (args.length !== 3) {
					throw new UsageError("add requires exactly 3 arguments: <name> <description> <dueDate>.");
				}

				const [name, description, dueDate] = args;
				const task = commandService.addTask(name, description, dueDate);
				console.log(`Added task ${task.id}: ${task.name}`);
				return;
			}

			case "delete": {
				if (args.length !== 1) {
					throw new UsageError("delete requires exactly 1 argument: <id>.");
				}

				const [taskId] = args;
				const task = commandService.deleteTask(taskId);
				console.log(`Deleted task ${task.id}: ${task.name}`);
				return;
			}

			default:
				throw new UsageError(`Unknown command: ${command}`);
		}
	} catch (error) {
		if (error instanceof UsageError) {
			console.error(`Error: ${error.message}`);
			console.log("");
			printUsage();
			process.exitCode = 1;
			return;
		}

		console.error("Unexpected error:", error);
		process.exitCode = 1;
	}
}

main();
