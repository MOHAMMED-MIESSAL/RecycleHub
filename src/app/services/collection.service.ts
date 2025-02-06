import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../models/collection-request.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private apiUrl = 'http://localhost:3000/requests';

  constructor(private http: HttpClient) {}

  addRequest(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.apiUrl, request);
  }

  getUserRequests(userId: number): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}?userId=${userId}`);
  }

  updateRequest(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.put<CollectionRequest>(`${this.apiUrl}/${request.id}`, request);
  }

  deleteRequest(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/${id}`);
  }

  getAllRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl);
  }
}
