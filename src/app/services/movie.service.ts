import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Rating } from '../models/enums';

export interface Movie {
  id: number;
  title: string;
  poster: string;
  category: Category;
  rating: Rating;
  description: string;
  releaseYear: number;
  director?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesKey = 'movies';
  private watchlistKey = 'watchlist';
  private moviesSubject: BehaviorSubject<Movie[]>;
  private watchlistSubject: BehaviorSubject<Movie[]>;

  constructor() {
    const storedMovies = localStorage.getItem(this.moviesKey);
    const storedWatchlist = localStorage.getItem(this.watchlistKey);

   const initialMovies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [
  {
    id: 1,
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY679_.jpg',
    category: Category.Action,
    rating: Rating.PG13,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    releaseYear: 2010,
    director: 'Christopher Nolan'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: 'assets/2.jpeg',  // صورة محلية
    category: Category.Action,
    rating: Rating.PG13,
    description: 'Batman faces the Joker in this thrilling superhero movie.',
    releaseYear: 2008,
    director: 'Christopher Nolan'
  },
  {
    id: 3,
    title: 'Forrest Gump',
    poster: 'assets/3.jpeg',
    category: Category.Drama,
    rating: Rating.PG13,
    description: 'The life journey of Forrest Gump, a man with a kind heart and simple mind.',
    releaseYear: 1994,
    director: 'Robert Zemeckis'
  },
  {
    id: 4,
    title: 'The Hangover',
    poster:  'assets/4.jpg',
    category: Category.Comedy,
    rating: Rating.PG13,
    description: 'Three friends lose the groom during their Las Vegas bachelor party.',
    releaseYear: 2009,
    director: 'Todd Phillips'
  },
  {
    id: 5,
    title: 'Titanic',
    poster:  'assets/5.jpeg',
    category: Category.Romance,
    rating: Rating.PG13,
    description: 'A love story unfolds on the ill-fated Titanic voyage.',
    releaseYear: 1997,
    director: 'James Cameron'
  },
  {
    id: 6,
    title: 'Interstellar',
    poster: 'assets/6.jpeg',  // صورة محلية جديدة
    category: Category.Action,
    rating: Rating.PG13,
    description: 'Explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    releaseYear: 2014,
    director: 'Christopher Nolan'
  },
  {
    id: 7,
    title: 'Joker',
    poster: 'assets/7.jpeg',  // صورة محلية جديدة
    category: Category.Drama,
    rating: Rating.NC17,
    description: 'A mentally troubled comedian embarks on a downward spiral of revolution and crime.',
    releaseYear: 2019,
    director: 'Todd Phillips'
  }
];

    this.moviesSubject = new BehaviorSubject<Movie[]>(initialMovies);
    this.watchlistSubject = new BehaviorSubject<Movie[]>(storedWatchlist ? JSON.parse(storedWatchlist) : []);

    if (!storedMovies) {
      localStorage.setItem(this.moviesKey, JSON.stringify(initialMovies));
    }
  }

  // Movies
  getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  addMovie(movie: Movie) {
    const current = this.moviesSubject.value;
    movie.id = current.length > 0 ? Math.max(...current.map(m => m.id)) + 1 : 1;
    const updated = [...current, movie];
    this.moviesSubject.next(updated);
    localStorage.setItem(this.moviesKey, JSON.stringify(updated));
  }

  removeMovie(id: number) {
    const updated = this.moviesSubject.value.filter(m => m.id !== id);
    this.moviesSubject.next(updated);
    localStorage.setItem(this.moviesKey, JSON.stringify(updated));
  }

  getMovieById(id: number): Movie | undefined {
    return this.moviesSubject.value.find(m => m.id === id);
  }

  // Watchlist
  getWatchlist(): Movie[] {
    return this.watchlistSubject.value;
  }

  addToWatchlist(movie: Movie) {
    const current = this.watchlistSubject.value;
    if (!current.find(m => m.id === movie.id)) {
      const updated = [...current, movie];
      this.watchlistSubject.next(updated);
      localStorage.setItem(this.watchlistKey, JSON.stringify(updated));
    }
  }

  removeFromWatchlist(id: number) {
    const updated = this.watchlistSubject.value.filter(m => m.id !== id);
    this.watchlistSubject.next(updated);
    localStorage.setItem(this.watchlistKey, JSON.stringify(updated));
  }
}
