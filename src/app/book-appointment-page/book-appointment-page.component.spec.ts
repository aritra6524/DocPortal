import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentPageComponent } from './book-appointment-page.component';

describe('BookAppointmentPageComponent', () => {
  let component: BookAppointmentPageComponent;
  let fixture: ComponentFixture<BookAppointmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAppointmentPageComponent]
    });
    fixture = TestBed.createComponent(BookAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
