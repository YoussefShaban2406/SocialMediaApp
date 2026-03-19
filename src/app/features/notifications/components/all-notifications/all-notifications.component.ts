import { Component, inject, OnInit } from '@angular/core';
import { NotificationCardComponent } from "../notification-card/notification-card.component";
import { GetAllNotificationsService } from '../../services/get-all-notifications.service';
import { Notification } from '../../interfaces/IAllNotifications';
import { LoadingSpinnerComponent } from "../../../static-pages/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-all-notifications',
  imports: [NotificationCardComponent, LoadingSpinnerComponent],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css',
})
export class AllNotificationsComponent implements OnInit {
  private readonly getAllNotificationsService = inject(GetAllNotificationsService);

  allNotifications!: Notification[];

  ngOnInit(): void {
    this.getAllNotificationsService.getAllNotifications().subscribe({
      next: (res) => {
        console.log(res);
        this.allNotifications = res.data.notifications;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onNotificationMarkedAsRead(notiId: string) {
    // The NotificationCardComponent already updates the UI and persists the change.
    // This handler exists so parent views (e.g., an "unread" list) can react if desired.
    console.debug('Notification marked as read:', notiId);
  }
}
