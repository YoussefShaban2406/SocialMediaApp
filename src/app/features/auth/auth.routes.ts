import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

export const Auth_Routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'register',
        component: RegisterPageComponent
    },
];