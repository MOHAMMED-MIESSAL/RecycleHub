import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient , private router: Router) {}

  // Login function
  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find((u: User) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          return user;
        }
        return null;
      })
    );
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('loggedInUser'); // Supprimer l'utilisateur connecté
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser'); // Return true if the current user exists in local storage
  }

  checkUserRole(): boolean {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userRole = loggedInUser?.role;
    return userRole === 'particulier';
  }

  checkCollectorRole(): boolean {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userRole = loggedInUser?.role;
    return userRole === 'collecteur';
  }
}
