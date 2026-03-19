import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IAllNotifications } from '../interfaces/IAllNotifications';

@Injectable({
  providedIn: 'root',
})
export class GetAllNotificationsService {
  private readonly http = inject(HttpClient);

  getAllNotifications() {
    return this.http.get<IAllNotifications>(App_Apis.allNotifications.get);
  }
}
