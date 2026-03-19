import { Component, inject, OnInit } from '@angular/core';
import { NotificationCardComponent } from "../../components/notification-card/notification-card.component";
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MarkAllAsReadService } from '../../services/mark-all-as-read.service';
import { UnreadCountsService } from '../../services/unread-counts.service';

@Component({
  selector: 'app-notification-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css',
})
export class NotificationPageComponent implements OnInit {
  private readonly markAllAsReadService = inject(MarkAllAsReadService)
  private readonly unreadCountsService = inject(UnreadCountsService)

  unreadCounts!: number;

  ngOnInit(): void {
    this.ongettingUnreadCounts();
  }

  ongettingUnreadCounts() {
    this.unreadCountsService.getUnreadCounts().subscribe({
      next: (res) => {
        console.log(res);
        this.unreadCounts = res.data.unreadCount;
      }
    })
  }

  onMarkAllAsRead() {
    this.markAllAsReadService.markAllAsRead().subscribe({
      next: (res) => {
        console.log(res);
        this.unreadCounts = this.unreadCounts - res.data.modifiedCount;
      },
      error: (err) => console.log(err),
    })
  }
}