import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos = [
    new Todo(1, 'Become an expert at Angular', false, new Date()),
    new Todo(1, 'Become an expert at Node.js', false, new Date()),
    new Todo(1, 'Learn Reactjs', false, new Date())
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
