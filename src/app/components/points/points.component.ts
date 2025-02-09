import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addPoints, convertPoints } from '../../store/actions/points.actions';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [],
  templateUrl: './points.component.html',
  styleUrl: './points.component.css'
})
export class PointsComponent {
  totalPoints$ = this.store.select(state => state.points.totalPoints);

  constructor(private store: Store<{ points: { totalPoints: number } }>) {}

  addPoints(wasteType: string, weight: number) {
    this.store.dispatch(addPoints({ wasteType, weight }));
  }

  convertPoints(points: number) {
    this.store.dispatch(convertPoints({ points }));
  }
}
