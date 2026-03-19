import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAddedPost } from '../interfaces/IAddedPost';
import { App_Apis } from '../../../core/constants/app-apis';


@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  private readonly http = inject(HttpClient);


  addPost(userData: FormData) {
    return this.http.post<IAddedPost>(App_Apis.posts.add, userData);
  }
}