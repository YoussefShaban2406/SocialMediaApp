import { Component, inject, INJECTOR, OnInit } from '@angular/core';
import { GetMyPostsService } from '../../services/get-my-posts.service';
import { PostCardComponent } from "../../../../shared/components/post-card/post-card.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoadingSpinnerComponent } from "../../../static-pages/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-my-posts',
  imports: [PostCardComponent, InfiniteScrollDirective, LoadingSpinnerComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  private readonly getMyPostsService = inject(GetMyPostsService);
  responseOfMyPosts!: any;
  limit = 10;

  ngOnInit(): void {
    this.onGettingMyPosts();
  }

  onGettingMyPosts() {
    this.getMyPostsService.getMyPosts(this.limit).subscribe({
      next: (res) => {
        console.log(res);
        if (this.responseOfMyPosts) {
          this.responseOfMyPosts.push(...res.data.posts);
        } else {
          this.responseOfMyPosts = res.data.posts;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onPostUpdated(post: any) {
    if (!this.responseOfMyPosts) return;

    const idx = this.responseOfMyPosts.findIndex((p: any) => p._id === post._id);
    if (idx === -1) return;

    this.responseOfMyPosts[idx] = { ...this.responseOfMyPosts[idx], ...post };
  }

  onPostDeleted(postId: string) {
    if (!this.responseOfMyPosts) return;
    this.responseOfMyPosts = this.responseOfMyPosts.filter((p: any) => p._id !== postId);
  }

  onScroll(): void {
    this.limit += 1;
    this.onGettingMyPosts();
  }
}
