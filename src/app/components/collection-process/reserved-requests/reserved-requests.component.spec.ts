import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedRequestsComponent } from './reserved-requests.component';

describe('ReservedRequestsComponent', () => {
  let component: ReservedRequestsComponent;
  let fixture: ComponentFixture<ReservedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
