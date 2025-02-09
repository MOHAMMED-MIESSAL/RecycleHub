import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgForOf, NgIf} from '@angular/common';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {updatePoints, getAllPoints} from '../../store/points/points.actions';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-convert-points',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgForOf],
  template: `
    <app-navbar></app-navbar>
    <h1>Convert Points to Voucher</h1>
    <p *ngIf="!hasPoints && vouchers.length === 0">No points available and no vouchers available </p>
    <p *ngIf="hasPoints">Points: {{ currentPoints }}</p>

    <button *ngIf="hasPoints" (click)="convertPoints(100)" [disabled]="currentPoints < 100">
      100 points = 50 Dh Voucher
    </button>
    <button *ngIf="hasPoints" (click)="convertPoints(200)" [disabled]="currentPoints < 200">
      200 points = 120 Dh Voucher
    </button>
    <button *ngIf="hasPoints" (click)="convertPoints(500)" [disabled]="currentPoints < 500">
      500 points = 350 Dh Voucher
    </button>

    <div *ngIf="vouchers.length > 0">
      <h3>Bons d'achat :</h3>
      <ul>
        <li *ngFor="let voucher of vouchers">
          {{ voucher.type }} - {{ voucher.value }} Dh
        </li>
      </ul>
    </div>
  `,
})
export class ConvertPointsComponent implements OnInit {
  points$: Observable<number> = of(0);
  currentPoints: number = 0;
  userId: string = '';
  hasPoints: boolean = false;
  vouchers: Array<{ type: string; value: number }> = [];  // Array of vouchers for the current user

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userId = loggedInUser?.id;

    // Get points from localStorage
    const userPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
    // Get points for the current user
    const points = userPoints[this.userId] || 0;
    // Set the current points
    this.currentPoints = points;

    // If the user has points, display them in the component
    if (points > 0) {
      this.hasPoints = true;
      this.points$ = of(points);

      // Get vouchers from localStorage
      const userVouchers = JSON.parse(localStorage.getItem('userVouchers') || '[]');
      this.vouchers = userVouchers.filter((voucher: { userId: string }) => voucher.userId === this.userId);

      this.store.dispatch(getAllPoints({userId: this.userId, points: points}));
    } else {

      // Get vouchers from localStorage
      const userVouchers = JSON.parse(localStorage.getItem('userVouchers') || '[]');
      this.vouchers = userVouchers.filter((voucher: { userId: string }) => voucher.userId === this.userId);

      // If the user has no points and no vouchers, display a message
      if (this.vouchers.length === 0) {
        alert("Vous n'avez ni points ni bons d'achat disponibles.");
      }
    }

  }

  convertPoints(voucherValue: 100 | 200 | 500) {
    if (this.currentPoints >= voucherValue) {
      const newPoints = this.currentPoints - voucherValue;

      // Mettre à jour localStorage
      const userPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
      userPoints[this.userId] = newPoints;
      localStorage.setItem('userPoints', JSON.stringify(userPoints));

      // Ajouter le bon d'achat dans le tableau des bons d'achat
      const voucher = {type: `${voucherValue} points`, value: voucherValue / 2}; // Exemple de type de bon d'achat
      const userVouchers = JSON.parse(localStorage.getItem('userVouchers') || '[]');
      userVouchers.push({userId: this.userId, ...voucher});
      localStorage.setItem('userVouchers', JSON.stringify(userVouchers));

      // Mettre à jour le store NgRx
      this.store.dispatch(updatePoints({userId: this.userId, points: newPoints}));

      // Mettre à jour les points dans le composant
      this.currentPoints = newPoints;  // Mettre à jour localement sans recharger la page

      // Mettre à jour le tableau des bons d'achat
      this.vouchers.push(voucher);

      // Afficher un message de succès
      alert(`Conversion réussie ! Points restants : ${newPoints}`);
    } else {
      alert("Points insuffisants !");
    }
  }
}
