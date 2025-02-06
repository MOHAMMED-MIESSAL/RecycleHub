import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  userId?: number;
  userForm: FormGroup;
  user: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }


  ngOnInit() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.id !== undefined) {
        this.userId = parsedUser.id;
        this.userService.getUserById(this.userId!).subscribe(user => {
          this.user = user;
          this.userForm.patchValue(user);
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateUser() {
    if (!this.userId || this.userForm.invalid) return;

    const updatedUser = {...this.user, ...this.userForm.value}; // Fusionner les données

    this.userService.updateUser(this.userId, updatedUser).subscribe(() => {
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      alert('Profil mis à jour avec succès !');
      this.router.navigate(['/profile']);
    });
  }
}
