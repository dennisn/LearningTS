# Task Tracker CLI

Simple task tracker command-line app built with TypeScript.

## Features

- `list`: list all available tasks
- `add`: add a task with `name`, `description`, and `dueDate`
- `delete`: delete a task by id

Tasks are persisted as JSON in `data/tasks.json`.

Each task has:

- unique integer `id`
- `name`
- `description`
- `dueDate` (stored in ISO-8601 format)

## Requirements

- Node.js 20+

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Usage

```bash
npm run start -- list
npm run start -- add "Task name" "Task description" "2026-05-20T10:00:00Z"
npm run start -- delete 1
```

## Examples

List tasks:

```bash
npm run start -- list
```

Add a task:

```bash
npm run start -- add "Pay bills" "Pay electricity bill" "2026-06-01T08:30:00Z"
```

Delete a task:

```bash
npm run start -- delete 1
```

## Validation and Errors

- `add` requires exactly 3 arguments.
- `dueDate` must be a valid datetime string.
- `delete` requires a positive integer id.
- Deleting a missing id returns an error message.

## Tests

Run the small test suite:

```bash
npm test
```
