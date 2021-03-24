import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesAddComponent } from './adresses-add.component';

describe('AdressesAddComponent', () => {
  let component: AdressesAddComponent;
  let fixture: ComponentFixture<AdressesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
