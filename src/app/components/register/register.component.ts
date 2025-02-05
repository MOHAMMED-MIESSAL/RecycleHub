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
    this.userService.initializeCollectors();
  }
}
