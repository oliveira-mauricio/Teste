import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-task-add',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {

  form !: FormGroup;
  taskData !: any;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private location: Location,
  ){
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        status: ['todo', Validators.required],
        project_id: ['', Validators.required]
      });
  }

  ngOnInit(){
    this.taskData = history.state.data;
    if(this.taskData.name){
      this.isEditing = true;
      this.form.patchValue({
        name: this.taskData.name,
        description: this.taskData.description,
        status: this.taskData.status,
        project_id: this.taskData.project_id
      })
    }
  }

  back(){
    this.location.back();
  }

  onSubmit(){
    if(this.isEditing){
      if(this.form.valid){
        this.apiService.patchData('tasks', this.taskData.id ,this.form.value).subscribe(
          () => {
            this.location.back();
          }
        )
      }
    }
    if(!this.isEditing){
      this.form.patchValue({
        project_id: this.taskData.id
      });
      if(this.form.valid){
        this.apiService.postData('tasks', this.form.value).subscribe(
          () => {
            this.location.back();
          }
        )
      }
    }
  }

}
