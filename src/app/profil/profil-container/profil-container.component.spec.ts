import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilContainerComponent } from './profil-container.component';

describe('ProfilContainerComponent', () => {
  let component: ProfilContainerComponent;
  let fixture: ComponentFixture<ProfilContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
