import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private readonly http = inject(HttpClient);
  changeUserPassword(passwordChanger: any) {
    return this.http.patch(App_Apis.changePassword.patch, passwordChanger);
  }
}
