import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'; // N'oublie pas d'importer map

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) {
  }

  // Connexion
  login(email: string, password: string): Observable<User | undefined> {
    return this.userService.getUsers().pipe(
      map((users: User[]) => users.find((user: User) => user.email === email && user.password === password))
    );
  }

  // Inscription
  register(user: User): Observable<User> {
    return this.userService.addUser(user);
  }
}
