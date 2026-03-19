import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IAuthResponse, User } from '../../interfaces/IAuthResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { AuthInputComponent } from "../auth-input/auth-input.component";

@Component({
  selector: 'app-login-form',
  imports: [RouterLink, AuthInputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  // Include Auth Service for handling registration logic
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  errorMessege = '';
  userData!: User;

  constructor() {
    if (this.userData) {
      this.userData = JSON.parse(localStorage.getItem(Stored_Keys.userData) || '{}');
      this.loginForm.get('email')?.setValue(this.userData.email);
    }
  }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.handleLoginSuccess(response);
        },
        error: (error: HttpErrorResponse) => {
          this.handleLoginFailure(error);
        }
      })
      this.loginForm.reset();
    }
  }

  handleLoginSuccess(response: IAuthResponse): void {
    this.errorMessege = '';
    this.router.navigate(['/feed']);
    localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
    localStorage.setItem(Stored_Keys.userTocken, JSON.stringify(response.data.token));
  }

  handleLoginFailure(error: HttpErrorResponse): void {
    this.errorMessege = error.error?.message || 'An error occurred during registration. Please try again.';
  }

}
