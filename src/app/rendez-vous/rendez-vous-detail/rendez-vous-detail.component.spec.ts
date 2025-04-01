import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousDetailComponent } from './rendez-vous-detail.component';

describe('RendezVousDetailComponent', () => {
  let component: RendezVousDetailComponent;
  let fixture: ComponentFixture<RendezVousDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
