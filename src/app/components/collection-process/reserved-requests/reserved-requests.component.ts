import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CollectionRequest} from "../../../models/collection-request.model";
import {CollectionService} from "../../../services/collection.service";
import {Store} from '@ngrx/store';
import {updatePoints} from '../../../store/points/points.actions';
import {PointsService} from "../../../services/points.service";
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
        private store: Store,
        private pointsService: PointsService
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

    /*
         This method is used to complete a collection request
         It updates the status of the request and updates the user's points
         It also dispatches an action to update the points in the store
         The method is called when the collector clicks on the "Valider" or "Rejeter" button
      */
    completeCollection(requestId: string, status: 'validée' | 'rejetée') {
        this.collectionService.updateRequestStatus(requestId, status, this.loggedInUserId).subscribe({
            next: () => {
                if (status === 'validée') {
                    // After the request status has been updated, calculate the points earned by the user
                    this.collectionService.getRequestById(Number(requestId)).subscribe({
                        next: (request) => {
                            if (request) {
                                const pointsEarned = request.wasteDetails.reduce((acc, detail) => {
                                    const type = detail.type.toLowerCase();
                                    let multiplier = type === 'plastique' ? 2 :
                                        type === 'verre' ? 1 :
                                            type === 'papier' ? 1 :
                                                type === 'métal' ? 5 : 0;
                                    return acc + Number(((detail.weight / 1000) * multiplier).toFixed(2)); // Calcul en kg
                                }, 0);

                                // Call the API to update the user's points
                                this.pointsService.updateUserPoints(String(request.userId), pointsEarned).subscribe({
                                    next: () => {
                                        // Mise à jour du store après succès de l'API
                                        this.store.dispatch(updatePoints({
                                            userId: String(request.userId),
                                            points: pointsEarned
                                        }));
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
                // Update the reserved requests list after the request status has been updated
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
