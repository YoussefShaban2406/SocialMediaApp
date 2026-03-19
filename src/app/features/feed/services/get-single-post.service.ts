import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { ISinglePostResponse } from '../interfaces/ISinglePostResponse';

@Injectable({
  providedIn: 'root',
})
export class GetSinglePostService {
  private readonly http = inject(HttpClient);

  getSinglePost(postID: string){
    return this.http.get<ISinglePostResponse>(`${App_Apis.Post.get}/${postID}`)
  }
}
