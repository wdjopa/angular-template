import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FourOhFourComponent } from './four-oh-four.component';

describe('FourOhFourComponent', () => {
  let component: FourOhFourComponent;
  let fixture: ComponentFixture<FourOhFourComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FourOhFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourOhFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
