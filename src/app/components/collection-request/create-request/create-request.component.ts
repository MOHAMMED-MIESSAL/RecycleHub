import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {CollectionService} from '../../../services/collection.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "../../navbar/navbar.component";
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})

export class CreateRequestComponent {
  requestForm: FormGroup;
  weightError = false;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      wasteDetails: this.fb.array([]),
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }

  // Function to add a request
  addRequest() {
    this.checkRequestLimit().then(isLimitReached => {
      // Check if the form is valid and the total weight is between 1000 and 10000
      // Also check if the limit of 3 pending requests is reached
      if (this.requestForm.valid && !this.weightError && !isLimitReached) {
        const user = localStorage.getItem('loggedInUser');
        if (!user) return;

        const userId = JSON.parse(user).id;
        const requestData = {
          id: String(Date.now()),
          ...this.requestForm.value,
          userId,
          status: 'en attente'
        };

        this.collectionService.addRequest(requestData).subscribe(() => {
          this.router.navigate(['request/my-request']);
        });
      } else {
        // Display an alert if the form is invalid or the limit is reached
        alert("Vous avez déjà 3 demandes en attente ");
      }
    });
  }

  // Function to check if the user has reached the limit of 3 pending requests
  checkRequestLimit(): Promise<boolean> {
    const user = localStorage.getItem('loggedInUser');
    if (!user) return Promise.resolve(false);

    const userId = JSON.parse(user).id;
    return new Promise((resolve) => {
      this.collectionService.getRequestsByUserId(userId).subscribe((requests) => {
        const pendingRequests = requests.filter(request => request.status === 'en attente' || request.status === 'rejetée');
        resolve(pendingRequests.length >= 3);  // Get the number of pending requests and check if it's greater than or equal to 3
      });
    });
  }

  // Getters for form controls and arrays to simplify the template code :

  getWeightControl(waste: any): FormControl {
    return waste.get('weight') as FormControl;
  }

  get wasteDetailsArray(): FormArray {
    return this.requestForm.get('wasteDetails') as FormArray;
  }

  get totalWeight(): number {
    return this.wasteDetailsArray.controls
      .map(control => Number(control.get('weight')?.value) || 0)
      .reduce((acc, val) => acc + val, 0);
  }

  toggleWasteType(type: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const index = this.wasteDetailsArray.controls.findIndex(ctrl => ctrl.get('type')?.value === type);

    if (checked && index === -1) {
      this.wasteDetailsArray.push(this.fb.group({
        type,
        weight: [0, [Validators.required, Validators.min(0)]]
      }));
    } else if (!checked && index >= 0) {
      this.wasteDetailsArray.removeAt(index);
    }

    this.checkTotalWeightValidity();
  }

  checkTotalWeightValidity() {
    const total = this.totalWeight;
    this.weightError = total < 1000 || total > 10000;
  }

  onWeightChange() {
    this.checkTotalWeightValidity();
  }

}
