import { Component, EventEmitter, inject, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../../../features/feed/services/comments.service';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from '../../../../features/feed/interfaces/IAddCommentResponse';

@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddCommentComponent {
  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);
  private readonly fb = inject(FormBuilder);
  private readonly commentsService = inject(CommentsService);
  imagePreview!: String | '';
  isLoading = false;
  @Input() postID!: string;
  @Output() commentAdded = new EventEmitter();

  addCommentsForm = this.fb.group({
    content: [''],
    image: [new File([], '')]
  });


  onAddComment(): void {
    let sentUserData = this.addCommentsForm.value as Record<string | '', string | File>;
    const formData = new FormData;
    Object.keys(sentUserData).forEach((key) => {
      const value = sentUserData[key];
      if (value) {
        formData.append(key, value);
      }
    });
    this.isLoading = true
    this.commentsService.addComment(formData, this.postID).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false
        const newCommentData: Comment = {
          ...res.data.comment,
          ...(this.imagePreview && { photo: this.imagePreview }),
          ...(this.addCommentsForm.value.content && { content: this.addCommentsForm.value.content })
        };
        this.commentAdded.emit(newCommentData);
        this.addCommentsForm.reset();
        this.imagePreview = '';
      },
      error: (err: HttpErrorResponse) => {
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
      this.addCommentsForm.patchValue({ image: selectedImage }); //To Upload the Photo to the Server
      this.imagePreview = URL.createObjectURL(selectedImage); //To Show the Image in the Designated Area
    }
  }
}
