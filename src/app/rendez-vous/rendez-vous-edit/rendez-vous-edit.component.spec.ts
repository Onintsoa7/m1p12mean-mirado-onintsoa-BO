import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousEditComponent } from './rendez-vous-edit.component';

describe('RendezVousEditComponent', () => {
  let component: RendezVousEditComponent;
  let fixture: ComponentFixture<RendezVousEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
