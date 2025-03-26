import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      adresseMail: ['', [Validators.required, Validators.email]],
      numeroTel: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value
      ? null
      : { mismatch: true };
  }

  submitForm() {
    if (this.registerForm.valid) {
      console.log('Formulaire valide, utilisateur inscrit', this.registerForm.value);
      this.router.navigate(['/login']); // Redirige après l'inscription
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
