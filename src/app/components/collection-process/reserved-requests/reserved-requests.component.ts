import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CollectionRequest} from "../../../models/collection-request.model";
import {CollectionService} from "../../../services/collection.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reserved-requests',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './reserved-requests.component.html',
  styleUrl: './reserved-requests.component.css'
})
export class ReservedRequestsComponent implements OnInit {
  reservedRequests$: Observable<CollectionRequest[]> = new Observable<CollectionRequest[]>();
  collectorAddress: string = '';
  loggedInUserId: string = '';

  constructor(private collectionService: CollectionService) {
  }

  ngOnInit() {
    const collector = localStorage.getItem('loggedInUser');
    if (collector) {
      const parsedCollector = JSON.parse(collector);
      this.collectorAddress = parsedCollector.address.trim();
      this.loggedInUserId = parsedCollector.id;

      // Get reserved requests for the collector
      this.reservedRequests$ = this.collectionService.getReservedRequestsForCollector(this.loggedInUserId);

    }
  }


  startCollection(requestId: string) {
    this.collectionService.updateRequestStatus(requestId, 'en cours', this.loggedInUserId).subscribe(() => {
      this.reservedRequests$ = this.collectionService.getReservedRequestsForCollector(this.loggedInUserId);
    });
  }

  completeCollection(requestId: string, status: 'validée' | 'rejetée') {
    this.collectionService.updateRequestStatus(requestId, status, this.loggedInUserId).subscribe(() => {
      this.reservedRequests$ = this.collectionService.getReservedRequestsForCollector(this.loggedInUserId);
    });
  }

  getTotalWeight(request: CollectionRequest): number {
    return request.wasteDetails?.reduce((acc, w) => acc + (w.weight || 0), 0) || 0;
  }

}
