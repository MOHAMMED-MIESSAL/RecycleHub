import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) {
  }

  // Login function
  login(email: string, password: string): Observable<User | undefined> {
    return this.userService.getUsers().pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user)); // Save the current user in local storage
        }
        return user;
      })
    );
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('currentUser'); // Supprimer l'utilisateur connecté
  }

  // Register function
  register(user: User): Observable<User> {
    return this.userService.addUser(user);
  }
}
