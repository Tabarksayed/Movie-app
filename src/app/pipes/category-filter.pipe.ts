import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../services/movie.service';
import { Category } from '../models/enums';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(movies: Movie[] | null, category: Category | 'All'): Movie[] {
    if (!movies) return [];
    if (category === 'All') return movies;
    return movies.filter(m => m.category === category);
  }
}
