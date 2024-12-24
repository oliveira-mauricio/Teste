import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [ RouterOutlet, CommonModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  me !: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
      this.authService.me().subscribe(
        (response) => {
          this.me = response;
        }
      );
  }

  logout(){
      const token = this.authService.getToken()
      this.authService.logout(token).subscribe(
        () => {
          this.authService.revokeToken();
          this.router.navigate(['/login']);
        }
      );
  }

  seePermissions(){
    this.router.navigate(['/permissions']);
  }
}
