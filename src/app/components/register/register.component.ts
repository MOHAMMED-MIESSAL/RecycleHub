import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    role: 'particulier'
  };

  users: User[] = [];

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
    this.initCollectors();
  }


  // Function to add a new user
  onSubmit() {
    this.authService.register(this.user).subscribe(response => {
      console.log('Utilisateur enregistré avec succès', response);
      this.loadUsers(); // Recharger la liste après ajout
    });
  }

  // Function to delete a user
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('Utilisateur supprimé');
    });
    this.loadUsers();
  }

  // Function to load all users
  private loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // Function to initialize users
  private initCollectors() {

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
