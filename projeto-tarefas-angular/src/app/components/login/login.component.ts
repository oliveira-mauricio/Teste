import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    this.authService.login(formData).subscribe(
      (response) => {
        this.successMessage = 'Login Realizado com Sucesso';
        this.errorMessage = null;
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);        
      },
    );
  }

}
