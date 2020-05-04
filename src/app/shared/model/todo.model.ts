export class Todo {
  id: number;
  username: string;
  description: string;
  targetDate: Date;
  done: boolean;

  constructor(id: number, username: string, description: string, targetDate: Date, done: boolean) {
    this.id = id;
    this.username = username;
    this.description = description;
    this.done = done;
    this.targetDate = targetDate;
  }
}
