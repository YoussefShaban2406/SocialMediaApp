import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IFollowingMessege } from '../interfaces/IFollowingMessege';

@Injectable({
  providedIn: 'root',
})
export class PutFollowUserService {
  private readonly http = inject(HttpClient);
  putFollowUser(userID: string) {
    return this.http.put<IFollowingMessege>(`${App_Apis.follow.put}/${userID}/follow`,'');
  }
}
