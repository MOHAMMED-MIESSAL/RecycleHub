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
    if (this.requestForm.valid && !this.weightError) {
      const user = localStorage.getItem('loggedInUser');
      if (!user) return;

      const userId = JSON.parse(user).id;
      const requestData = {
        id: String(Date.now()),
        ...this.requestForm.value,
        userId,
        status: 'en attente'
      };

      this.collectionService.addRequest(requestData).subscribe((response) => {
        this.router.navigate(['request/my-request']);
      });

    }
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
