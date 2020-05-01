export class Todo {
  id: number;
  description: string;
  done: boolean;
  targetDate: Date;

  constructor(id: number, description: string, done: boolean, targetDate: Date) {
    this.id = id;
    this.description = description;
    this.done = done;
    this.targetDate = targetDate;
  }
}
