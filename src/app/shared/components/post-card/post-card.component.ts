import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../../features/feed/interfaces/IAllPostsResponse';
import { AddCommentComponent } from "../comments/add-comment/add-comment.component";
import { AllCommentsComponent } from "../comments/all-comments/all-comments.component";
import { CommentsService } from '../../../features/feed/services/comments.service';
import { Comment } from '../../../features/feed/interfaces/IGetPostCommentsResponse';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { GetSinglePostService } from '../../../features/feed/services/get-single-post.service';
import { BookmarkPostService } from '../../../features/feed/services/bookmark-post.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UpdatePostService } from '../../../features/feed/services/update-post.service';
import { DeletePostService } from '../../../features/feed/services/delete-post.service';
import { LikePostService } from '../../../features/feed/services/like-post.service';
import { GetPostLikesService } from '../../../features/feed/services/get-post-likes.service';
import { SharePostService } from '../../../features/feed/services/share-post.service';


@Component({
  selector: 'app-post-card',
  imports: [AllCommentsComponent, AddCommentComponent, ReactiveFormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  private readonly commentsService = inject(CommentsService);
  private readonly getSinglePostService = inject(GetSinglePostService);
  private readonly bookmarkPostService = inject(BookmarkPostService);
  private readonly updatePostService = inject(UpdatePostService);
  private readonly deletePostService = inject(DeletePostService);
  private readonly likePostService = inject(LikePostService);
  private readonly getPostLikesService = inject(GetPostLikesService);
  private readonly sharePostService = inject(SharePostService);
  private readonly fb = inject(FormBuilder);
  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);
  @Input() post!: Post;
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() postDeleted = new EventEmitter<string>();
  timeNow = new Date().toISOString();
  isShowTopComment = true;
  allComments!: Comment[];
  // Single Post Operations
  selectedPost!: any;
  isModalOpen: boolean = false;
  // Post Actions
  isOnEditingPost: boolean = false;
  updatePostForm = this.fb.group({
    body: ['']
  });

  sharePostObj = {
    'body': 'Sharing Post'
  }


  // Comments
  getPostComments(postID: string): void {
    this.commentsService.getAllComments(postID).subscribe({
      next: (res) => {
        console.log(res);
        this.allComments = res.data.comments;
        this.isShowTopComment = false;
      }
    })
  }

  // Single Post Operations
  onGettingSinglePost(postID: string) {
    this.getSinglePostService.getSinglePost(postID).subscribe({
      next: (res) => {
        console.log(res);
        this.selectedPost = res.data.post;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openPostModal(post: any) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPost = null;
  }
  // Post Actions (Del, Edit, Bookmark)
  onBookMarkPost(postID: string) {
    this.bookmarkPostService.bookMarkPost(postID).subscribe({
      next: (res) => {
        console.log(res);
        this.post.bookmarked = !this.post.bookmarked;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  onEditPost() {
    this.isOnEditingPost = true;
    this.updatePostForm.patchValue({
      body: this.post.body
    });
  }

  onUpdatePost(postId: string): void {
    const updatedBody = this.updatePostForm.value.body;
    const updatedData = {
      body: this.updatePostForm.value.body
    };
    this.updatePostService.updatePost(postId, updatedData).subscribe({
      next: (res) => {
        console.log(res.data);
        this.post.body = updatedBody as any;
        this.postUpdated.emit(this.post);
        this.updatePostForm.reset();
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        this.updatePostForm.patchValue({
          body: this.post.body
        });
        this.isOnEditingPost = false;
      }
    });
  }

  onDeletePost(postID: string, PosUserID: string) {
    if (PosUserID === this.userData._id) {
      this.deletePostService.DeletePostService(postID).subscribe({
        next: (res) => {
          console.log(res);
          this.postDeleted.emit(postID);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onLikePost(postID: string) {
    this.likePostService.likePost(postID).subscribe({
      next: (res) => {
        console.log(res);

        // Update post state from backend response (likes count / liked list)
        if (res?.data?.post) {
          this.post.likes = res.data.post.likes;
          this.post.likesCount = res.data.post.likesCount;
        }

        // Refresh likes list from the backend to keep in sync.
        this.getPostLikesService.getPostLikes(postID, 1, 20).subscribe({
          next: (likesRes) => {
            if (likesRes?.data?.likes) {
              this.post.likes = likesRes.data.likes;
              this.post.likesCount = likesRes.data.likes.length;
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSharePost(postID: string) {
    this.sharePostService.sharePost(postID, this.sharePostObj).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.data?.post) {
          this.post.sharesCount = res.data.post.sharesCount;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
