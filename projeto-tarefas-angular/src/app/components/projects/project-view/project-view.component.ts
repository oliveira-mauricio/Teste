import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-project-view',
  imports: [ DatePipe, CommonModule ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {

  projectData !: any;
  user !: any;
  permissions: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ){
    
  }
  
  ngOnInit(){
    this.projectData = history.state.data;
    this.authService.me().subscribe(
      (user) => {
        this.user = user;
        if(this.projectData){
          this.apiService.getData('projects', this.projectData.id).subscribe(
            (project) => {
              this.projectData = project.project;
              if(user.id === project.project.created_by){
                this.permissions = true;
              }
            }
          );
        }
      }
    );
  }

  back(){
    this.router.navigate(['/']);
  }

  add(){
    this.router.navigate(['/add-task'], { state : { data: {id : this.projectData.id}}});
  }

  view(event: any){
    this.router.navigate(['/view-task'], {state : { data: event }});
  }

  edit(event: any){
    this.router.navigate(['/add-task'], {state : { data: event }});
  }

  delete(event: any){
    this.apiService.deleteData('tasks', event.id).subscribe(
      () => {
        this.apiService.getData('projects', this.projectData.id).subscribe(
          (response) => {
            this.projectData = response.project;
          }
        )
      }
    )
  }
}
