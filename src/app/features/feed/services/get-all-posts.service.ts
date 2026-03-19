import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAllPostsResponse } from '../interfaces/IAllPostsResponse';
import { App_Apis } from '../../../core/constants/app-apis';


@Injectable({
  providedIn: 'root',
})
export class GetAllPostsService {
  private readonly http = inject(HttpClient);


  getAllPosts(pageNumber = 1){
    return this.http.get<IAllPostsResponse>(`${App_Apis.posts.add}?limit=10&page=${pageNumber}`);
  }
}
