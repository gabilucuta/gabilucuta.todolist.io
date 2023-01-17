import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/task';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTaks: Task[] = [];
  updatedId !: any;
  isEditEnabled: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    })
    this.todoForm.controls['item'].reset();
  }

  removeTask(i: number) {
    this.tasks.splice(i, 1);
  }

  removeTaskInProgression(i: number) {
    this.inProgressTasks.splice(i, 1);
  }

  updateTask(task: Task, i: number) {
    this.isEditEnabled = true;
    this.todoForm.controls['item'].setValue(task.description);
    this.updatedId = i;
  }

  onUpdateSubmit() {
    this.tasks[this.updatedId].description = this.todoForm.value.item;
    this.tasks[this.updatedId].done = false;
    this.isEditEnabled = false;
    this.todoForm.controls['item'].reset();
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
