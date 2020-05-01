import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos = [
    {id: 1, description: 'Become an expert at Angular'},
    {id: 2, description: 'Become an expert at Node.js'},
    {id: 3, description: 'Learn Reactjs'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
