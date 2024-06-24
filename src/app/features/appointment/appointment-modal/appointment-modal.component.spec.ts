import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentModalComponent } from './appointment-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppointmentModalComponent', () => {
  let component: AppointmentModalComponent;
  let fixture: ComponentFixture<AppointmentModalComponent>;
  let mockDialogRef;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NoopAnimationsModule, AppointmentModalComponent, ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('title')?.value).toEqual('');
    expect(component.form.get('description')?.value).toEqual('');
  });


  it('should not submit if form is invalid', () => {
    component.form.controls['title'].setValue(''); 
    component.submit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should submit if form is valid', () => {
    const validAppointment = {
      guid: '123',
      title: 'Valid Title',
      description: 'Valid Description',
      from: new Date(),
      to: new Date()
    };
    component.form.setValue(validAppointment);
    component.submit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(validAppointment);
  });
});