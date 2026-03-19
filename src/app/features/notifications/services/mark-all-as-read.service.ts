import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IMarkAllAsRead } from '../interfaces/IMarkAllAsRead';

@Injectable({
  providedIn: 'root',
})
export class MarkAllAsReadService {
  private readonly http = inject(HttpClient)

  markAllAsRead(){
    return this.http.patch<IMarkAllAsRead>(App_Apis.markAllAsRead.patch,'')
  }
}
