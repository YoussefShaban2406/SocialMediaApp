import { Component, inject, OnInit } from '@angular/core';
import { GetAllSuggestionsService } from '../../services/get-all-suggestions.service';
import { Suggestion } from '../../interfaces/ISuggestedFollowers';
import { FeedSuggestedCardComponent } from "../../../../shared/components/feed-suggested-card/feed-suggested-card.component";

@Component({
  selector: 'app-feed-suggested-friends',
  imports: [FeedSuggestedCardComponent],
  templateUrl: './feed-suggested-friends.component.html',
  styleUrl: './feed-suggested-friends.component.css',
})
export class FeedSuggestedFriendsComponent implements OnInit {
  private readonly getAllSuggestionsService = inject(GetAllSuggestionsService);

  allSuggestedFollowers!: Suggestion[];


  ngOnInit(): void {
    this.getSuggestedFollowers();
  }

  getSuggestedFollowers() {
    this.getAllSuggestionsService.getAllSuggestions().subscribe({
      next: (res) => {
        console.log(res.data.suggestions);
        this.allSuggestedFollowers = res.data.suggestions;
      }
    })
  }
  
}
