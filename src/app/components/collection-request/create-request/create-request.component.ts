import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import {CollectionService} from '../../../services/collection.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "../../navbar/navbar.component";


@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent {
  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      wasteType: this.fb.array([], Validators.required),
      estimatedWeight: [1000, [Validators.required, Validators.min(1000), Validators.max(10000)]],
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }


  // Get wasteTypeArray
  get wasteTypeArray(): FormArray {
    return this.requestForm.get('wasteType') as FormArray;
  }


  // Toggle waste type
  toggleWasteType(type: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.wasteTypeArray.push(this.fb.control(type));
    } else {
      const index = this.wasteTypeArray.controls.findIndex(ctrl => ctrl.value === type);
      if (index >= 0) {
        this.wasteTypeArray.removeAt(index);
      }
    }
  }

  addRequest() {
    // Check if form is valid before submitting
    if (this.requestForm.valid) {
      // Get user id from local storage
      const user = localStorage.getItem('loggedInUser');
      if (!user) return;

      const userId = JSON.parse(user).id;
      const requestData = {...this.requestForm.value, userId, status: 'en attente'};

      this.collectionService.addRequest(requestData).subscribe(() => {
        this.router.navigate(['/request/add']);
      });
    }
  }

}
