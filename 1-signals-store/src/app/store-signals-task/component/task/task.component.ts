import { Component, inject, OnInit } from '@angular/core';
import { TasksStore } from '../../store/task.store';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task',
  imports: [],
  // providers: [TasksStore], solo es para este estado, sin usar root
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  readonly store = inject(TasksStore);

  ngOnInit(): void {
    const tasks: Task[] = [
      {
      id: '1',
      title: 'Task 1',
      completed: true,
    },
    {
      id: '2',
      title: 'Task 2',
      completed: false,
    },
    {
      id: '3',
      title: 'Task 3',
      completed: true,
    },
    ]

    this.store.loadTask(tasks);
  }
}
