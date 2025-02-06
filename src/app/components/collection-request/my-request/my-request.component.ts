import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from '../../../services/collection.service';
import { CollectionRequest } from '../../../models/collection-request.model';

@Component({
  standalone: true,
  selector: 'app-my-request',
  imports: [CommonModule],
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {
  requests: CollectionRequest[] = [];
  userId: number = -1;

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.userId = JSON.parse(user).id;
    }
  }

  ngOnInit() {
    if (this.userId) {
      this.loadRequests();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadRequests() {

    this.collectionService.getUserRequests(this.userId).subscribe((requests: CollectionRequest[]) => {
      console.log(requests);
      this.requests = requests;
    });
  }

  deleteRequest(id: number) {
    this.collectionService.deleteRequest(id).subscribe(() => {
      this.requests = this.requests.filter(req => req.id !== id);
    });
  }
}
