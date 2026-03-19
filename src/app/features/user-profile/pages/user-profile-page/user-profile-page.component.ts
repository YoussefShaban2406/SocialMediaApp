import { Component, inject, OnInit } from '@angular/core';
import { GetUserProfileService } from '../../services/get-user-profile.service';
import { UploadProfilePicService } from '../../services/upload-profile-pic.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/IUserProfile';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { MyPostsComponent } from "../../../feed/components/my-posts/my-posts.component";

@Component({
  selector: 'app-user-profile-page',
  imports: [ReactiveFormsModule, MyPostsComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent implements OnInit {

  private getUserProfileService = inject(GetUserProfileService);
  private uploadProfilePicService = inject(UploadProfilePicService);
  private fb = inject(FormBuilder);
  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);
  user!: User;
  imagePreview: string | null = null;

  updateProfilePicForm = this.fb.group({
    image: [null as File | null]
  });

  ngOnInit(): void {
    this.getUserProfileService.getUserProfile().subscribe({
      next: (res) => {
        this.user = res.data.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    // update form
    this.updateProfilePicForm.patchValue({
      image: file
    });

    // preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onUploadImage() {

    const formData = new FormData();

    const image = this.updateProfilePicForm.get('image')?.value;

    if (image) {
      formData.append('photo', image);
    }

    this.uploadProfilePicService.uploadProfilePic(formData).subscribe({
      next: (res) => {
        console.log(res);

        // update UI instantly
        this.user.photo = res.data.photo;
        this.userData.photo = res.data.photo;
      
        // reset
        this.updateProfilePicForm.reset();
        this.imagePreview = null;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}