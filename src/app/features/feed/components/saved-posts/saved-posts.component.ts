import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { GetAllPostsService } from '../../services/get-all-posts.service';
import { IAllPostsResponse, Post } from '../../interfaces/IAllPostsResponse';
import { PostCardComponent } from "../../../../shared/components/post-card/post-card.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoadingSpinnerComponent } from "../../../static-pages/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-saved-posts',
  imports: [PostCardComponent, InfiniteScrollDirective, LoadingSpinnerComponent],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent {
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

  onScroll(): void {
    this.currentPage += 1;
    this.onGettingAllPosts();
  }
}
