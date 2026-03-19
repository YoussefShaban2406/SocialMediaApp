import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IUnreadNotificationsCounts } from '../interfaces/IUnreadNotificationsCounts';

@Injectable({
  providedIn: 'root',
})
export class UnreadCountsService {
  private readonly http = inject(HttpClient);

  getUnreadCounts() {
    return this.http.get<IUnreadNotificationsCounts>(App_Apis.getUnreadCounts.get);
  }
}
