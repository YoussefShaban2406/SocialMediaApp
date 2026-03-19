import { Component, ViewChild } from '@angular/core';
import { AddPostsComponent } from "../../../../shared/components/add-posts/add-posts.component";
import { FeedSideBarComponent } from "../../components/feed-side-bar/feed-side-bar.component";
import { Post } from '../../interfaces/IAllPostsResponse';
import { FeedSuggestedFriendsComponent } from "../../components/feed-suggested-friends/feed-suggested-friends.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feed-page',
  imports: [AddPostsComponent, FeedSideBarComponent, FeedSuggestedFriendsComponent, RouterOutlet],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
})
export class FeedPageComponent {
  @ViewChild(RouterOutlet) routerOutlet?: RouterOutlet;

  newPost?: Post;

  onNewPostAdded(post: any): void {
    if (!post) return;
    this.newPost = post;
    this.updateActiveRouteWithNewPost();
  }

  onActivate(component: any) {
    if (component && typeof component.addNewPost === 'function') {
      component.addNewPost(this.newPost);
    }
  }

  private updateActiveRouteWithNewPost() {
    const activeComponent = this.routerOutlet?.component as any;
    if (activeComponent && typeof activeComponent.addNewPost === 'function') {
      activeComponent.addNewPost(this.newPost);
    }
  }
}

