import { Routes } from '@angular/router';


import { Auth_Routes } from './features/auth/auth.routes';


import { Feed_Routes } from './features/feed/feed.routes';
import { User_Profile_Routes } from './features/user-profile/user-profile.routes';
import { authGuard } from './core/guards/auth-guard';
import { loggedInGuard } from './core/guards/logged-in-guard';
import { notifications_Routes } from './features/notifications/notifications.routes';


export const routes: Routes = [
    // Define your application routes here
    /* 
        >> 1- Auth Module
        >> 2- Users Module
        >> 3- Not Found Module    
     */
    // Auth Route
    {
        path: '',
        canActivate: [loggedInGuard],
        loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: Auth_Routes
    },
    // Users Route
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'feed',
                pathMatch: 'full'
            },
            {
                path: 'feed',
                loadComponent: () => import('./features/feed/pages/feed-page/feed-page.component').then(m => m.FeedPageComponent),
                children: Feed_Routes
            },
            {
                path: 'user-profile',
                children: User_Profile_Routes
            },
            {
                path: 'notifications',
                loadComponent: () => import('./features/notifications/pages/notification-page/notification-page.component').then(m => m.NotificationPageComponent),
                children: notifications_Routes
            }
        ]
    },
    //NotFound Route
    {
        path: 'not-found',
        loadComponent: () => import('./features/static-pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
