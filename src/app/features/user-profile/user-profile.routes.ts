import { Routes } from "@angular/router";


export const User_Profile_Routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/user-profile-page/user-profile-page.component').then(m => m.UserProfilePageComponent)
    },
    {
        path: 'change-password',
        loadComponent: () => import('./pages/change-password-page/change-password-page.component').then(m => m.ChangePasswordPageComponent)
    }

]