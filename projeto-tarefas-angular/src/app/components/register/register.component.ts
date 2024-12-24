import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ){
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    if(formData.password !== formData.password_confirmation){
      return;
    }

    this.authService.register(formData).subscribe(
      (response) => {
        this.successMessage = `Usuario ${response.user.name} criado com sucesso.`;
        this.errorMessage = null;
        this.router.navigate(['/login']);  
      }
    );
  }

}
