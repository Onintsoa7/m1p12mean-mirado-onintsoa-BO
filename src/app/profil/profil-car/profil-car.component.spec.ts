import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCarComponent } from './profil-car.component';

describe('ProfilCarComponent', () => {
  let component: ProfilCarComponent;
  let fixture: ComponentFixture<ProfilCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
