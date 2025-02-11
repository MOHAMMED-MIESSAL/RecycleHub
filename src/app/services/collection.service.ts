import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CollectionRequest} from '../models/collection-request.model';
import {map} from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private apiUrl = 'http://localhost:3000/requests';

  constructor(private http: HttpClient, private store: Store) {
  }

  addRequest(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.apiUrl, request);
  }

  updateRequest(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.put<CollectionRequest>(`${this.apiUrl}/${request.id}`, request);
  }

  deleteRequest(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/${id}`);
  }

  getRequestById(id: number): Observable<CollectionRequest | null> {
    return this.http.get<CollectionRequest>(`${this.apiUrl}/${id}`);
  }

  getRequestsByUserId(userId: number | string): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}`).pipe(
      map(requests => requests.filter(request => request.userId !== null && request.userId === userId))
    );
  }


  /*
   Those methods return the requests that are available for a collector with the same address as the collector
   And that are not reserved by another collector,also the requests that are reserved by the collector
   And the method for updating the status of a request .
  */

  getAvailableRequestsForCollector(collectorAddress: string): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl).pipe(
      map(requests => requests.filter(request =>
        request.status === 'en attente' && request.address.trim() === collectorAddress.trim()
      ))
    );
  }

  getReservedRequestsForCollector(collectorId: string): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl).pipe(
      map(requests => requests.filter(request =>
        request.status === 'occupée' || request.status === 'en cours' && request.collectorId === collectorId
      ))
    );
  }

  updateRequestStatus(requestId: string, status: string, collectorId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${requestId}`, {status, collectorId});
  }


}
