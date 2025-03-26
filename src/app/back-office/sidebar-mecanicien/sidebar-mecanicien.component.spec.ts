import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMecanicienComponent } from './sidebar-mecanicien.component';

describe('SidebarMecanicienComponent', () => {
  let component: SidebarMecanicienComponent;
  let fixture: ComponentFixture<SidebarMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
