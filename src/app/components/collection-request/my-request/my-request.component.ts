import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';
import {CollectionRequest} from '../../../models/collection-request.model';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  standalone: true,
  selector: 'app-my-request',
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {
  requests: CollectionRequest[] = [];
  userId?: number;

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.userId = JSON.parse(user).id;
      this.loadRequests();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadRequests() {
    if (!this.userId) return;
    this.collectionService.getRequestsByUserId(this.userId).subscribe((requests: CollectionRequest[]) => {
      this.requests = requests;
    });
  }

  getTotalWeight(wasteDetails: { type: string; weight: number }[]): number {
    return wasteDetails.reduce((total, waste) => total + waste.weight, 0);
  }

  deleteRequest(id: string) {
    this.collectionService.deleteRequest(id).subscribe(() => {
      this.requests = this.requests.filter(req => req.id !== id);
    });
  }
}
