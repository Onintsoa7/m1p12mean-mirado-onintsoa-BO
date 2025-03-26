import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilFactureComponent } from './profil-facture.component';

describe('ProfilFactureComponent', () => {
  let component: ProfilFactureComponent;
  let fixture: ComponentFixture<ProfilFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilFactureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
