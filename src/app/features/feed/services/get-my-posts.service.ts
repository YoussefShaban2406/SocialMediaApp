import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IMyPostsResponse } from '../interfaces/IMyPostsResponse';

@Injectable({
  providedIn: 'root',
})
export class GetMyPostsService {
  private readonly http = inject(HttpClient);

  getMyPosts(limit = 10) {
    return this.http.get<IMyPostsResponse>(`${App_Apis.myPosts.get}/feed?only=following&limit=${limit}`);
  }
}
