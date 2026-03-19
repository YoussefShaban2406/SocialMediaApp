import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class MarkNotificationAsReadService {
  private readonly http = inject(HttpClient);

  onMarkingNotificationAsRead(notiID: string){
    return this.http.patch(`${App_Apis.markAsRead.patch}/${notiID}/read`,'');
  }
}
