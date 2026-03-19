import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { ILikeResponse } from '../interfaces/ILikeResponse';

@Injectable({
  providedIn: 'root',
})
export class LikePostService {
  private readonly http = inject(HttpClient);

  likePost(postID: string) {
    return this.http.put<ILikeResponse>(`${App_Apis.likePost.put}/${postID}/like`, '')
  }
}
