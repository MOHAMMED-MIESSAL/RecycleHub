import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {CollectionService} from '../../../services/collection.service';
import {WasteDetail, CollectionRequest} from '../../../models/collection-request.model';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {
  requestForm!: FormGroup;
  requestId!: number;
  weightError = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private router: Router
  ) {
  }

  // First, we subscribe to the route params to get the request ID.
  // Then, we call the service to get the request data by ID.
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.requestId = Number(params['id']);
      console.log("Request ID récupéré :", this.requestId);

      if (!this.requestId || isNaN(this.requestId)) {
        console.error("ID de la demande invalide !");
        return;
      }

      this.collectionService.getRequestById(this.requestId).subscribe((request: CollectionRequest | null) => {
        if (request) {
          this.initForm(request);
        } else {
          console.error("Aucune demande trouvée avec cet ID !");
        }
      });
    });
  }

  // We initialize the form with the request data.
  private initForm(request: CollectionRequest) {
    this.requestForm = this.fb.group({
      wasteDetails: this.fb.array(
        (request.wasteDetails || []).map((waste: WasteDetail) =>
          this.fb.group({
            type: [waste.type, Validators.required],
            weight: [waste.weight, [Validators.required, Validators.min(100)]]
          })
        )
      ),
      address: [request.address || '', Validators.required],
      date: [request.date || '', Validators.required],
      timeSlot: [request.timeSlot || '', Validators.required],
      notes: [request.notes || '']
    });

    this.checkTotalWeightValidity();
  }

  // Function to update a request
  updateRequest() {
    if (this.requestForm.valid && !this.weightError) {

      const user = localStorage.getItem('loggedInUser');
      if (!user) return;

      const userId = JSON.parse(user).id;

      const updatedRequest = {
        id: this.requestId,
        ...this.requestForm.value,
        userId,
        status: 'en attente'
      };

      this.collectionService.updateRequest(updatedRequest).subscribe(() => {
        this.router.navigate(['/request/my-request']);
      });
    }
  }

  // Getters to access form controls easily in the template

  get wasteDetailsArray(): FormArray {
    return this.requestForm.get('wasteDetails') as FormArray;
  }

  get totalWeight(): number {
    return this.wasteDetailsArray.controls.reduce((sum, ctrl) => sum + Number(ctrl.get('weight')?.value), 0);
  }

  checkTotalWeightValidity() {
    const total = this.totalWeight;
    this.weightError = total < 1000 || total > 10000;
  }

  onWeightChange() {
    this.checkTotalWeightValidity();
  }


}
