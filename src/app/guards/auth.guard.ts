import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) return true;

    Swal.fire({
      icon: 'warning',
      title: 'Access Denied',
      text: 'You must login first!',
      confirmButtonText: 'Go to Login'
    }).then(() => {
      this.router.navigate(['/login']);
    });

    return false;
  }
}
