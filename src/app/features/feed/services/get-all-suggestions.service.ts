import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { ISuggestedFollowers } from '../interfaces/ISuggestedFollowers';

@Injectable({
  providedIn: 'root',
})
export class GetAllSuggestionsService {
  private readonly http = inject(HttpClient);
  getAllSuggestions(){
    return this.http.get<ISuggestedFollowers>(App_Apis.suggestions.get)
  }
}
