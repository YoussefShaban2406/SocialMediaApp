import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../../features/feed/interfaces/IAllPostsResponse';
import { AddPostService } from '../../../features/feed/services/add-post.service';

@Component({
  selector: 'app-add-posts',
  imports: [ReactiveFormsModule],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
})
export class AddPostsComponent {
  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);
  private readonly fb = inject(FormBuilder);
  private readonly addPostService = inject(AddPostService);
  imagePreview!: String | '';
  isLoading = false;
  @Output() postAdded = new EventEmitter<Post>();

  addPostForm = this.fb.group({
    body: [''],
    image: [new File([], '')]
  });

  onAddPost(): void {
    let sentUserData = this.addPostForm.value as Record<string | '', string | File>;
    const formData = new FormData;
    Object.keys(sentUserData).forEach((key) => {
      const value = sentUserData[key];
      if (value) {
        formData.append(key, value);
      }
    });
    this.isLoading = true
    this.addPostService.addPost(formData).subscribe({
      next: (res) => {
        console.log(res.data);
        this.isLoading = false
        const newPost: Post = {
          ...res.data.post,
          user: this.userData,
          commentsCount: 0,
          topComment: null as any,
          sharesCount: 0,
          bookmarked: false,
        };
        this.postAdded.emit(newPost);
        this.addPostForm.reset();
        this.imagePreview = '';
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  onImageSelect(event: Event) {
    const image = (event.target as HTMLInputElement).files;
    if (image) {
      let selectedImage = image[0];
      this.addPostForm.patchValue({ image: selectedImage }); //To Upload the Photo to the Server
      this.imagePreview = URL.createObjectURL(selectedImage); //To Show the Image in the Designated Area
    }
  }
}