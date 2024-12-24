import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projects',
  imports: [ CommonModule ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projects !: any;
  user !: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ){
    this.authService.me().subscribe(
      (response) => {
        this.user = response;
      }
    );
    this.apiService.getAllData('projects').subscribe(
      (response) => {
        this.projects = response.projects;
      }
    );
  }

  add(){
    this.router.navigate(['/add-project'])
  }

  view(event: any){
    this.router.navigate(['/view-project'], {state: { data: event }})
  }

  edit(event: any){
    this.router.navigate(['/add-project'], {state: { data: event }})
  }

  delete(event: any){
    this.apiService.deleteData('projects',event.id).subscribe(
      () => {
        this.apiService.getAllData('projects').subscribe(
          (response) => {
            this.projects = response.projects;
          }
        )
      }
    );
  }


}
