import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IUserProfilePic } from '../interfaces/IUserProfilePic';

@Injectable({
  providedIn: 'root',
})
export class UploadProfilePicService {
  private readonly http = inject(HttpClient);

  uploadProfilePic(photo: FormData) {
    return this.http.put<IUserProfilePic>(App_Apis.uploadProfilePic.put, photo);
  }
}
