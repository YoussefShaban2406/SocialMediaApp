import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IUserProfile } from '../interfaces/IUserProfile';

@Injectable({
  providedIn: 'root',
})
export class GetUserProfileService {
  private readonly http = inject(HttpClient);

  getUserProfile() {
    return this.http.get<IUserProfile>(App_Apis.userProfile.get)
  }
}
