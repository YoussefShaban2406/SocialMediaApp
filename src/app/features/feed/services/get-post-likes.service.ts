import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';

export interface IPostLikesResponse {
  success: boolean;
  message: string;
  data: {
    likes: any[];
    pagination?: {
      currentPage: number;
      limit: number;
      total: number;
      numberOfPages: number;
      nextPage: number | null;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class GetPostLikesService {
  private readonly http = inject(HttpClient);

  getPostLikes(postId: string, page = 1, limit = 20) {
    return this.http.get<IPostLikesResponse>(
      `${App_Apis.postLikes.get}/${postId}/likes?page=${page}&limit=${limit}`
    );
  }
}
