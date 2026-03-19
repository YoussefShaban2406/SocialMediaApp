import { environment } from "../../../environments/environment.development";
import { AllNotificationsComponent } from "../../features/notifications/components/all-notifications/all-notifications.component";

export const App_Apis = {
    auth: {
        signUp: `${environment.baseUrl}/users/signup`,
        signIn: `${environment.baseUrl}/users/signin`,
    },
    posts: {
        add: `${environment.baseUrl}/posts`,
        getAll: `${environment.baseUrl}/posts`
    },
    myPosts: {
        get: `${environment.baseUrl}/posts`
    },
    Post: {
        get: `${environment.baseUrl}/posts`
    },
    comments: {
        add: `${environment.baseUrl}/posts`,
        getAll: `${environment.baseUrl}/posts`
    },
    suggestions: {
        get: `${environment.baseUrl}/users/suggestions?limit=10`
    },
    follow: {
        put: `${environment.baseUrl}/users`
    },
    userProfile: {
        get: `${environment.baseUrl}/users/profile-data`
    },
    uploadProfilePic: {
        put: `${environment.baseUrl}/users/upload-photo`
    },
    bookmakrPost: {
        put: `${environment.baseUrl}/posts/`
    },
    updatePost: {
        put: `${environment.baseUrl}/posts/`
    },
    deletePost: {
        delete: `${environment.baseUrl}/posts/`
    },
    likePost: {
        put: `${environment.baseUrl}/posts`
    },
    postLikes: {
        get: `${environment.baseUrl}/posts`
    },
    sharePost: {
        put: `${environment.baseUrl}/posts`
    },
    allNotifications: {
        get: `${environment.baseUrl}/notifications`
    },
    markAsRead: {
        patch: `${environment.baseUrl}/notifications`
    },
    markAllAsRead: {
        patch: `${environment.baseUrl}/notifications/read-all`
    },
    getUnreadCounts: {
        get: `${environment.baseUrl}/notifications/unread-count`
    },
    changePassword: {
        patch: `${environment.baseUrl}/users/change-password`
    }
}