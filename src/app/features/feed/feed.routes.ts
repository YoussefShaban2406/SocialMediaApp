import { Routes } from "@angular/router";





export const Feed_Routes: Routes = [
  {
    path: "",
    redirectTo: "all-posts",
    pathMatch: "full",
  },
  {
    path: "all-posts",
    loadComponent: () => import('../../shared/components/all-posts/all-posts.component').then(m => m.AllPostsComponent)
  },
  {
    path: "my-posts",
    loadComponent: () => import('./components/my-posts/my-posts.component').then(m => m.MyPostsComponent),
  },
  {
    path: "community",
    loadComponent: () => import('./components/community/community.component').then(m => m.CommunityComponent),
  },
  {
    path: "saved",
    loadComponent: () => import('./components/saved-posts/saved-posts.component').then(m => m.SavedPostsComponent),
  },
];