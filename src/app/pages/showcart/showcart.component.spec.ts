import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowcartComponent } from './showcart.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ShowcartComponent', () => {
  let component: ShowcartComponent;
  let fixture: ComponentFixture<ShowcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcartComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ShowcartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the form onSubmit method 1 times', () => {
    fixture.detectChanges();

    let onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();
    expect(onSubmitSpy).not.toHaveBeenCalled();

    let button = fixture.nativeElement.querySelector('.checkout-btn');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Check-Out');

    button.click();
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
