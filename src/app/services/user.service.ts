import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  private storageKey = 'users';

  constructor() {
  }

  // Get all users
  getUsers(): Observable<User[]> {
    const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(users);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    // Générer un ID unique
    user.id = users.length ? users[users.length - 1].id + 1 : 1;

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return of(user);
  }

  // Update a user
  updateUser(user: User): Observable<User> {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const index = users.findIndex((u: User) => u.id === user.id);

    if (index !== -1) {
      users[index] = user;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    return of(user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    users = users.filter((user: User) => user.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return of();
  }

  // Load all users
  loadUsers(): void {
    this.getUsers().subscribe(users => {
      this.users = users;
      console.log('Utilisateurs chargés:', users);
    });
  }

  // Initialize users
  initializeCollectors() {

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Define collectors
    const collecteurs: User[] = [
      {
        id: 1,
        email: 'collecteur1@example.com',
        password: 'password',
        firstName: 'Collecteur',
        lastName: 'Un',
        address: 'Adresse 1',
        phoneNumber: '1234567890',
        dateOfBirth: '1990-01-01',
        role: 'collecteur'
      },
      {
        id: 2,
        email: 'collecteur2@example.com',
        password: 'password',
        firstName: 'Collecteur',
        lastName: 'Deux',
        address: 'Adresse 2',
        phoneNumber: '0987654321',
        dateOfBirth: '1990-02-01',
        role: 'collecteur'
      }
    ];

    // Verify if collectors already exist
    const collecteursExistants = users.filter((user: User) => user.role === 'collecteur');

    // Add collectors if they don't exist
    if (collecteursExistants.length === 0) {
      localStorage.setItem('users', JSON.stringify([...users, ...collecteurs]));
    }
  }
}
