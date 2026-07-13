import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';
import { Category } from '../../models/enums';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe, CategoryFilterPipe],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  movies$: Observable<Movie[]>;
  filteredCategory: Category | 'All' = 'All';
  categories = Object.values(Category);

constructor(private movieService: MovieService, public watchlistService: WatchlistService) {
  this.movies$ = this.movieService.getMovies();
}



removeMovie(movieId: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to remove this movie!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.movieService.removeMovie(movieId);
      Swal.fire('Removed!', 'The movie has been removed.', 'success');
    }
  });
}

}
