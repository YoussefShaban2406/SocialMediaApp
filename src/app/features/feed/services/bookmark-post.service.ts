import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IBookmarkPost } from '../interfaces/IBookmarkPost';

@Injectable({
  providedIn: 'root',
})
export class BookmarkPostService {
  private readonly http = inject(HttpClient);

  bookMarkPost(postID: string) {
    return this.http.put<IBookmarkPost>(`${App_Apis.bookmakrPost.put}/${postID}/bookmark`, '')
  }
}
