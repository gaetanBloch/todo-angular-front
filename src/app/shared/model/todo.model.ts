export class Todo {
  id: number;
  description: string;
  targetDate: Date;
  done: boolean;

  constructor(id: number, description: string, targetDate: Date, done: boolean) {
    this.id = id;
    this.description = description;
    this.done = done;
    this.targetDate = targetDate;
  }
}
