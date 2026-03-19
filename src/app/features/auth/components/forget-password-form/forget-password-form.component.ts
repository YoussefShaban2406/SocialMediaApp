import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../../user-profile/services/change-password.service';

@Component({
  selector: 'app-forget-password-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.css',
})
export class ForgetPasswordFormComponent {
  private readonly changePasswordService = inject(ChangePasswordService)
  private readonly fb = inject(FormBuilder);
  isLoading = false
  showCurrent = false;
  showNew = false;
  showConfirm = false;
  changePasswordForm = this.fb.group({
    password: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;

    if (this.changePasswordForm.invalid) return;

    const { password, newPassword, confirmPassword } = this.changePasswordForm.value;

    // Check password match
    if (newPassword !== confirmPassword) {
      this.changePasswordForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

    const payload = {
      password,
      newPassword
    };

    this.isLoading = true;

    this.changePasswordService.changeUserPassword(payload).subscribe({

      next: (res) => {
        console.log('Password updated successfully');

        this.isLoading = false;

        this.changePasswordForm.reset();
        this.isSubmitted = false;
      },

      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }

    });
  }
}
