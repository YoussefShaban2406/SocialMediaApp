import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IDeletePost } from '../interfaces/IDeletePost';

@Injectable({
  providedIn: 'root',
})
export class DeletePostService {
  private readonly http = inject(HttpClient);

  DeletePostService(postID: string) {
    return this.http.delete<IDeletePost>(`${App_Apis.deletePost.delete}/${postID}`);
  }
}
