import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { Movie } from '../../../services/movie.service';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncatePipe],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: Movie[] = [];

  constructor(
    private watchlistService: WatchlistService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  remove(movieId: number) {
    this.watchlistService.removeFromWatchlist(movieId);
    this.loadWatchlist();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
