import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Data, IAllPostsResponse, Post } from '../../../features/feed/interfaces/IAllPostsResponse';
import { GetAllPostsService } from '../../../features/feed/services/get-all-posts.service';
import { PostCardComponent } from "../post-card/post-card.component";
import { LoadingSpinnerComponent } from "../../../features/static-pages/loading-spinner/loading-spinner.component";


@Component({
  selector: 'app-all-posts',
  imports: [PostCardComponent, InfiniteScrollDirective, LoadingSpinnerComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})
export class AllPostsComponent implements OnInit, OnChanges {
  private readonly allPosts = inject(GetAllPostsService);
  responseOfAllPosts!: Post[];
  @Input() newAddedPost!: Post[];
  timeNow = new Date().toISOString();
  currentPage = 1;

  ngOnInit() {
    this.onGettingAllPosts();
  }

  onGettingAllPosts() {
    this.allPosts.getAllPosts(this.currentPage).subscribe({
      next: (res: IAllPostsResponse) => {
        console.log(res.data);

        if (this.responseOfAllPosts) {
          this.responseOfAllPosts.push(...res.data.posts);
        } else {
          this.responseOfAllPosts = res.data.posts;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['newAddedPost'] && this.newAddedPost && this.newAddedPost.length > 0) {
      this.addNewPost(this.newAddedPost[this.newAddedPost.length - 1]);
    }
  }

  addNewPost(post: Post): void {
    if (!post) return;

    if (!this.responseOfAllPosts) {
      this.responseOfAllPosts = [];
    }

    this.responseOfAllPosts.unshift(post);
  }

  onPostUpdated(post: Post) {
    if (!this.responseOfAllPosts) return;

    const idx = this.responseOfAllPosts.findIndex((p) => p._id === post._id);
    if (idx === -1) return;

    this.responseOfAllPosts[idx] = { ...this.responseOfAllPosts[idx], ...post };
  }

  onPostDeleted(postId: string) {
    if (!this.responseOfAllPosts) return;
    this.responseOfAllPosts = this.responseOfAllPosts.filter((p) => p._id !== postId);
  }

  onScroll(): void {
    this.currentPage += 1;
    this.onGettingAllPosts();
  }
}

