import { Component, inject, OnInit } from '@angular/core';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { LoadingSpinnerComponent } from '../../../static-pages/loading-spinner/loading-spinner.component';
import { GetAllNotificationsService } from '../../services/get-all-notifications.service';
import { Notification } from '../../interfaces/IAllNotifications';

@Component({
  selector: 'app-unread-notifications',
  imports: [NotificationCardComponent, LoadingSpinnerComponent],
  templateUrl: './unread-notifications.component.html',
  styleUrl: './unread-notifications.component.css',
})
export class UnreadNotificationsComponent implements OnInit {
  private readonly getAllNotificationsService = inject(GetAllNotificationsService);

  unreadNotifications!: Notification[];

  ngOnInit(): void {
    this.getAllNotificationsService.getAllNotifications().subscribe({
      next: (res) => {
        this.unreadNotifications = res.data.notifications.filter((n) => !n.isRead);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onNotificationMarkedAsRead(notiId: string) {
    // Remove it from the unread list.
    this.unreadNotifications = this.unreadNotifications.filter((n) => n._id !== notiId);
  }
}
