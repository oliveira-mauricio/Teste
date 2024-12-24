import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-project-add',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss'
})
export class ProjectAddComponent {

  form !: FormGroup;
  projectData !: any;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ){
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        created_by: ['', Validators.required]
      });
  }

  ngOnInit(){
    this.projectData = history.state.data;
    if(this.projectData){
      this.isEditing = true;
      this.form.patchValue({
        name: this.projectData.name,
        description: this.projectData.description,
        created_by: this.projectData.created_by
      })
    }
  }

  back(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    this.authService.me().subscribe(
      (user) => {
        if(!this.isEditing){
          this.form.patchValue({
            created_by: user.id
          });
          if(this.form.valid){
            this.apiService.postData('projects',this.form.value).subscribe(
              () => {
                this.router.navigate(['/']);
              }
            );
          }
        }
        if(this.isEditing){
          if(this.form.valid){
            this.apiService.patchData('projects', this.projectData.id ,this.form.value).subscribe(
              () => {
                this.router.navigate(['/']);
              }
            );
          }
        }
      }
    )
  }
}
