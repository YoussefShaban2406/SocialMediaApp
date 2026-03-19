import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Notification } from '../../interfaces/IAllNotifications';
import { DatePipe, NgClass } from '@angular/common';
import { MarkNotificationAsReadService } from '../../services/mark-notification-as-read.service';

@Component({
  selector: 'app-notification-card',
  imports: [DatePipe, NgClass],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  @Input() noti!: Notification;
  @Output() markAsRead = new EventEmitter<string>();

  private readonly markNotificationAsReadService = inject(MarkNotificationAsReadService);

  icon = {
    'like': 'thumbs-up',
    'comment': 'message',
    'follow': 'heart',
    'share': 'retweet'
  }
  
  onMarkAsRead() {
    if (this.noti.isRead) return;

    // Update the UI immediately.
    this.noti.isRead = true;

    // Persist the read state to the backend.
    this.markNotificationAsReadService.onMarkingNotificationAsRead(this.noti._id).subscribe({
      next: () => {
        // Only notify parent after successful persistence.
        this.markAsRead.emit(this.noti._id);
      },
      error: (err) => {
        console.error('Failed to mark notification as read:', err);
        // Rollback on error.
        this.noti.isRead = false;
      },
    });
  }

}
