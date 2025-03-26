import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { SigninService } from '../core/services/signin.service';
import { UserLogin } from '../core/models/user';

@Component({
  selector: 'app-back-office',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule
  ],
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.scss'
})
export class BackOfficeComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signinService: SigninService
  ) {
    this.loginForm = this.fb.group({
      adresseMail: ['mirado@mirado.com', [Validators.required, Validators.email]],
      password: ['mirado', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    const userLogin: UserLogin = {
      adresseMail: this.loginForm.value.adresseMail,
      password: this.loginForm.value.password
    };

    this.isLoading = true;
    this.signinService.loginUser(userLogin).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('token', response.body.token);
        localStorage.setItem('user', JSON.stringify(response.body.user));
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['backoffice/mecanicien']); // Rediriger après la connexion
        }, 2000);
      },
      error: (err) => {
        console.error('Échec de la connexion :', err);
        this.isLoading = false;
      }
    });
  }
}
