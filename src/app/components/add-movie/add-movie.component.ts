import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';
import { Category, Rating } from '../../models/enums';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
  addMovieForm: FormGroup;
  categories = Object.values(Category);
  ratings = Object.values(Rating);
  submitted = false;
  posterPreview: string = '';

  constructor(private fb: FormBuilder, private movieService: MovieService, private router: Router) {
    this.addMovieForm = this.fb.group({
      title: ['', Validators.required],
      poster: [''],
      category: ['', Validators.required],
      rating: ['', Validators.required],
      description: [''],
      releaseYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      director: ['']
    });
  }

  submit() {
    this.submitted = true;
    if (this.addMovieForm.valid) {
      const newMovie: Movie = { id: 0, ...this.addMovieForm.value };
      this.movieService.addMovie(newMovie);
      this.router.navigate(['/movies/list']);
    }
  }

  get f() { return this.addMovieForm.controls; }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreview = reader.result as string;
        this.addMovieForm.patchValue({ poster: this.posterPreview });
      };
      reader.readAsDataURL(file);
    }
  }
}
