import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInputComponent } from "../auth-input/auth-input.component";
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router } from '@angular/router';
import { IAuthResponse } from '../../interfaces/IAuthResponse';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, AuthInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  // Include Auth Service for handling registration logic
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  isLoading = false;
  errorMessege = '';
  successMessege = '';



  ngOnInit() {
    this.signUpForm.patchValue(
      {
        "name": "Ahmed Hamada",
        "username": "AhmedHamada1234",
        "email": "AhmedHamada1234@gmail.com",
        "dateOfBirth": "2000-06-24",
        "gender": "male",
        "password": "Aa@123456",
        "rePassword": "Aa@123456"
      }
    )
  }

  signUpForm = this.fb.group(
  {
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]
    ],
    rePassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]
    ]
  },
  {
    validators: [this.passwordMissMatch],
    updateOn: 'change'
  }
);

  onSignUpSubmit() {
    this.signUpForm.markAllAsTouched();
    this.errorMessege = '';
    this.successMessege = '';
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.AuthService.register(this.signUpForm.value).subscribe({
        next: (response) => {
          this.handleRegistrationSuccess(response);
        },
        error: (error: HttpErrorResponse) => {
          this.handleRegistrationFailure(error);
        }
      })
      this.signUpForm.reset();
    }
  }

  handleRegistrationSuccess(response: IAuthResponse): void {
    this.isLoading = false;
    this.errorMessege = '';
    this.successMessege = response.message || 'Registration successful! You can now log in.';
    this.router.navigate(['/login']);
    localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
  }

  handleRegistrationFailure(error: HttpErrorResponse): void {
    this.isLoading = false;
    this.successMessege = '';
    this.errorMessege = error.error?.message || 'An error occurred during registration. Please try again.';
  }


  passwordMissMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMissMatch: true };
  }
}
