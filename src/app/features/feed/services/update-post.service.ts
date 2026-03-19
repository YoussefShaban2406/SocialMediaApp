import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IAddedPost } from '../interfaces/IAddedPost';

@Injectable({
  providedIn: 'root',
})
export class UpdatePostService {
  private readonly http = inject(HttpClient);

  updatePost(postID: string, userData: any) {
    return this.http.put<IAddedPost>(`${App_Apis.updatePost.put}/${postID}`, userData)
  }
}
