import {Observable} from 'rxjs';
import {CollectionService} from '../../../services/collection.service';
import {AsyncPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {CollectionRequest} from '../../../models/collection-request.model';
import {NavbarComponent} from "../../navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-requests-list',
  standalone: true,
    imports: [
        AsyncPipe,
        NgFor,
        NgIf,
        NavbarComponent,
        RouterLink,
        DatePipe
    ],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent implements OnInit {
  availableRequests$: Observable<CollectionRequest[]> = new Observable<CollectionRequest[]>();
  reservedRequests$: Observable<CollectionRequest[]> = new Observable<CollectionRequest[]>(); // Ajout ici
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

      // Récupérer les demandes en attente
      this.availableRequests$ = this.collectionService.getAvailableRequestsForCollector(this.collectorAddress);

      // Récupérer les demandes réservées par ce collecteur
      this.reservedRequests$ = this.collectionService.getReservedRequestsForCollector(this.loggedInUserId);

    }
  }

  reserveRequest(requestId: string) {
    const collector = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    this.collectionService.updateRequestStatus(requestId, 'occupée', collector.id).subscribe(() => {
      this.availableRequests$ = this.collectionService.getAvailableRequestsForCollector(this.collectorAddress);
      this.reservedRequests$ = this.collectionService.getReservedRequestsForCollector(this.loggedInUserId);
    });
  }


  getTotalWeight(request: CollectionRequest): number {
    return request.wasteDetails?.reduce((acc, w) => acc + (w.weight || 0), 0) || 0;
  }


}
