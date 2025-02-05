  import {Component} from '@angular/core';
  import {FormsModule} from '@angular/forms';
  import {User} from '../../models/user.model';
  import {UserService} from '../../services/user.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [
      FormsModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
  })
  export class RegisterComponent{
    user: User = {
      id: Date.now(),
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      role: 'particulier'
    };

    constructor(private userService: UserService, private router: Router) {
    }

    onSubmit() {
      this.userService.addUser(this.user).subscribe(() => {
        console.log('Utilisateur enregistré avec succès');
        this.router.navigate(['/login']);
      });
    }
  }
