import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-view',
  imports: [ DatePipe ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  
  taskData !: any;

  constructor(
    private location: Location,
  ){

  }

  ngOnInit(){
    this.taskData = history.state.data;
  }
  
  back(){
    this.location.back();
  }
}
