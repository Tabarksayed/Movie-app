import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'movies',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: MovieListComponent },
      { path: 'add', component: AddMovieComponent },
      { path: ':id', component: MovieDetailComponent }
    ]
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./components/watchlist/watchlist/watchlist.component').then(m => m.WatchlistComponent),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/movies/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/movies/list' }
];
