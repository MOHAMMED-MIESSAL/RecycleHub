import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'users';

  constructor() {
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(users);
  }

  // Ajouter un nouvel utilisateur
  addUser(user: User): Observable<User> {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    // Générer un ID unique
    user.id = users.length ? users[users.length - 1].id + 1 : 1;

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return of(user);
  }

  // Mettre à jour un utilisateur existant
  updateUser(user: User): Observable<User> {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const index = users.findIndex((u: User) => u.id === user.id);

    if (index !== -1) {
      users[index] = user;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    return of(user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    users = users.filter((user: User) => user.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return of();
  }
}
