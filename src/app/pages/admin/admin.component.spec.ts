import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminComponent } from './admin.component';
import { OrderService } from 'src/app/services/orders/order.service';
import OrderServiceMock from '../../services/orders/order.service.mock';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: OrderService, useClass: OrderServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Admin orders on load', () => {
    expect(component.defaultOrders.length).toBe(2);
  });

  it('should delete Admin orders', () => {
    expect(component.defaultOrders.length - 1).toBe(1);
  });

  it('should track deleteOrder was not called', function () {
    spyOn(component, 'deleteOrder');
    expect(component.deleteOrder).not.toHaveBeenCalled();
  });

  it('should call the deleteOrder method 1 times', () => {
    fixture.detectChanges();

    let onSubmitSpy = spyOn(component, 'deleteOrder').and.callThrough();
    expect(onSubmitSpy).not.toHaveBeenCalled();

    let button = fixture.nativeElement.querySelector('.admin-deleteOrder');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('DELETE ORDER!');

    button.click();
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
