import { Routes } from "@angular/router";
import { NotificationPageComponent } from "./pages/notification-page/notification-page.component";



export const notifications_Routes: Routes = [

    {
        path: '',
        redirectTo: 'all-notifications',
        pathMatch: 'full'
    },
    {
        path: 'all-notifications',
        loadComponent: () => import('./components/all-notifications/all-notifications.component').then(m => m.AllNotificationsComponent)
    },
    {
        path: 'unread-notifications',
        loadComponent: () => import('./components/unread-notifications/unread-notifications.component').then(m => m.UnreadNotificationsComponent)
    }
];