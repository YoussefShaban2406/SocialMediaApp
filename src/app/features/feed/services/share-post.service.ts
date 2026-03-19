import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';

export interface ISharePostResponse {
    success: boolean;
    message: string;
    data: {
        post: any;
    };
}

@Injectable({
    providedIn: 'root',
})
export class SharePostService {
    private readonly http = inject(HttpClient);

    sharePost(postId: string, body: any) {
        // Backend should return the updated post object (with updated sharesCount / isShare etc.)
        return this.http.post<ISharePostResponse>(`${App_Apis.sharePost.put}/${postId}/share`, body);
    }
}
