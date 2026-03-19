import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PutFollowUserService } from '../../../features/feed/services/put-follow-user.service';
import { Suggestion } from '../../../features/feed/interfaces/ISuggestedFollowers';

@Component({
  selector: 'app-feed-suggested-card',
  imports: [],
  templateUrl: './feed-suggested-card.component.html',
  styleUrl: './feed-suggested-card.component.css',
})
export class FeedSuggestedCardComponent {
  @Input() suggestedFollower!: Suggestion;
  @Output() refreshView = new EventEmitter;
  private readonly putFollowUserService = inject(PutFollowUserService);
  isLoading = false;
  isFollowed = false;


  onFollowingUser(userID: string): void {
    this.isLoading = true
    this.putFollowUserService.putFollowUser(userID).subscribe({
      next: (res) => {
        this.isFollowed = res.data.following;
        this.isLoading = false
        this.refreshView.emit();
        console.log(res);
      }
    });
  }
}
