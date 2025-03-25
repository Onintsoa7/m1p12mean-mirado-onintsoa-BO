import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SigninService } from '../services/signin.service';
import { User, UserLogin } from '../core/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signinService: SigninService
  ) {
    this.loginForm = this.fb.group({
      adresseMail: ['mirado@mirado.com', [Validators.required, Validators.email]],
      password: ['mirado', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    const userLogin: UserLogin = {
      adresseMail: this.loginForm.value.adresseMail,
      password: this.loginForm.value.password
    };

    this.signinService.loginUser(userLogin).subscribe({
      next: (response) => {
        console.log('Login success:', response);

        // Stocker le token et l'utilisateur dans localStorage
        localStorage.setItem('token', response.body.token);
        localStorage.setItem('user', JSON.stringify(response.body.user));

        this.router.navigate(['/landing-page']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
