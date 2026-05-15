export interface TaskRecord {
  id: number;
  name: string;
  description: string;
  dueDate: string;
}

export class Task {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly dueDate: Date,
  ) {}

  public toRecord(): TaskRecord {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      dueDate: this.dueDate.toISOString(),
    };
  }

  public static fromRecord(record: TaskRecord): Task {
    const dueDate = new Date(record.dueDate);

    if (Number.isNaN(dueDate.getTime())) {
      throw new Error(`Invalid dueDate for task id ${record.id}`);
    }

    return new Task(record.id, record.name, record.description, dueDate);
  }
}
