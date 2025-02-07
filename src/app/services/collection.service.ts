import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CollectionRequest} from '../models/collection-request.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {

    private apiUrl = 'http://localhost:3000/requests';

    constructor(private http: HttpClient) {
    }

    addRequest(request: CollectionRequest): Observable<CollectionRequest> {
        return this.http.post<CollectionRequest>('http://localhost:3000/requests', request);
    }


    getUserRequests(userId: number): Observable<CollectionRequest[]> {
        return this.http.get<CollectionRequest[]>(`${this.apiUrl}?userId=${userId}`);
    }

    updateRequest(request: CollectionRequest): Observable<CollectionRequest> {
        return this.http.put<CollectionRequest>(`${this.apiUrl}/${request.id}`, request);
    }

    deleteRequest(id: string): Observable<{}> {
        return this.http.delete<{}>(`${this.apiUrl}/${id}`);
    }

    getRequestById(id: number): Observable<CollectionRequest | null> {
        return this.http.get<CollectionRequest>(`http://localhost:3000/requests/${id}`);
    }

    getAllRequests(): Observable<CollectionRequest[]> {
        return this.http.get<CollectionRequest[]>(this.apiUrl);
    }

  getRequestsByUserId(userId: number | string): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}`).pipe(
        map(requests => requests.filter(request => request.userId !== null && request.userId === userId))
    );
  }

}
