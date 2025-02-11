  import {Component} from '@angular/core';
  import {FormsModule} from '@angular/forms';
  import {User} from '../../models/user.model';
  import {UserService} from '../../services/user.service';
  import {Router, RouterLink} from '@angular/router';
  import {NavbarComponent} from "../navbar/navbar.component";

  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [
      FormsModule,
      NavbarComponent,
      RouterLink,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
  })
  export class RegisterComponent{
    user: User = {
      id: String(Date.now()),
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
        this.router.navigate(['/login']);
      });
    }
  }
