import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CollectionRequest} from "../../../models/collection-request.model";
import {CollectionService} from "../../../services/collection.service";
import {Store} from '@ngrx/store';
import {updatePoints} from '../../../store/points/points.actions';
import {PointsService} from "../../../services/points.service"; // Importer le service de points
import {AsyncPipe} from "@angular/common";
import {NgForOf} from "@angular/common";
import {NgIf} from "@angular/common";


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

  constructor(
    private collectionService: CollectionService,
    private store: Store,  // Ajouter Store pour dispatcher l'action
    private pointsService: PointsService // Ajouter le service de points
  ) {
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
    this.collectionService.updateRequestStatus(requestId, status, this.loggedInUserId).subscribe({
      next: () => {
        if (status === 'validée') {
          this.collectionService.getRequestById(Number(requestId)).subscribe({
            next: (request) => {
              if (request) {
                const pointsEarned = request.wasteDetails.reduce((acc, detail) => {
                  const type = detail.type.toLowerCase();
                  let multiplier = type === 'plastique' ? 2 :
                    type === 'verre' ? 1 :
                      type === 'papier' ? 1 :
                        type === 'métal' ? 5 : 0;
                  return acc + ((detail.weight / 1000) * multiplier); // Calcul en kg
                }, 0);

                // Appel direct au service pour sauvegarder dans users.json
                this.pointsService.updateUserPoints(String(request.userId), pointsEarned).subscribe({
                  next: () => {
                    // Mise à jour du store après succès de l'API
                    this.store.dispatch(updatePoints({userId: String(request.userId), points: pointsEarned}));
                  },
                  error: (err) => {
                    console.error('Erreur lors de la mise à jour des points dans le service:', err);
                  }
                });
              }
            },
            error: (err) => {
              console.error('Erreur lors de la récupération de la demande:', err);
            }
          });
        }
        // Rafraîchissement de la liste des demandes réservées
        this.reservedRequests$ = this.collectionService.getReservedRequestsForCollector(this.loggedInUserId);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut de la collecte:', err);
      }
    });
  }

  getTotalWeight(request: CollectionRequest): number {
    return request.wasteDetails?.reduce((acc, w) => acc + (w.weight || 0), 0) || 0;
  }
}
