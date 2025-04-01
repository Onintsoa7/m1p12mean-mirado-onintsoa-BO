import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, UserLogin } from '../core/models/user';
import { SigninService } from '../core/services/signin.service';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() loginOk = new EventEmitter<void>();
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signinService: SigninService,
    private authService : AuthService
  ) {
    this.loginForm = this.fb.group({
      adresseMail: ['mirado@mirado.com', [Validators.required, Validators.email]],
      password: ['mirado', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.isLoading = true; 
    const userLogin: UserLogin = {
      adresseMail: this.loginForm.value.adresseMail,
      password: this.loginForm.value.password
    };

    this.signinService.loginUser(userLogin).subscribe({
      next: () => {
        const user = this.authService.getUserFromToken();
        console.log('Utilisateur connecté :', user);
        this.loginOk.emit();
        this.router.navigate(['/landing-page']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Échec de la connexion :', err);
        this.isLoading = false;
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
