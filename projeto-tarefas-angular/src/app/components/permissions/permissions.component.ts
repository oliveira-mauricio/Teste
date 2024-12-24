import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {

  form !: FormGroup;
  users !: any[]|any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.authService.getAllUsers().subscribe(
      (users) => {
        this.users = users.users;

        const formControls: {[key: string]: FormControl} = {};

        if(Array.isArray(this.users)){
          this.users.forEach(user => {
            formControls[`user-${user.id}`] = new FormControl(user.role, Validators.required);
          })
          this.form = this.fb.group(formControls);
        }
      },
    );
  }

  save(){
    if (this.form.valid) {
      const updatedRoles = this.form.value;
      Object.keys(updatedRoles).forEach(key => {
        const userId = key.split('-')[1];
        const newRole = updatedRoles[key];
        this.authService.givePermission({ user_id: userId, permission: newRole }).subscribe(
          () => {}
        );
      });
    }
  }

  onSubmit(){
    this.save();
  }

  back(){
    this.router.navigate(['/']);
  }
}
