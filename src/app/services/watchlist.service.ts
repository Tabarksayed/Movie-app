import { Injectable } from '@angular/core';
import { Movie } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private storageKey = 'watchlist';
  private watchlist: Movie[];

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    this.watchlist = stored ? JSON.parse(stored) : [];
  }

  getWatchlist(): Movie[] {
    return this.watchlist;
  }

  addToWatchlist(movie: Movie) {
    if (!this.isInWatchlist(movie.id)) {
      this.watchlist.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(this.watchlist));
    }
  }

  removeFromWatchlist(id: number) {
    this.watchlist = this.watchlist.filter(m => m.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(this.watchlist));
  }

  isInWatchlist(id: number): boolean {
    return this.watchlist.some(m => m.id === id);
  }
}
