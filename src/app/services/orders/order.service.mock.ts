import { Observable, of } from 'rxjs';
import { IOrderAdmin } from '../../interfaces/IOrderAdmin';
import { IOrderService } from './order.service'

export default class OrderServiceMock implements IOrderService {
    getOrdersData(): Observable<IOrderAdmin[]> {
        return of([{
            "id": 763,
            "companyId": 777,
            "created": "2020-10-02",
            "createdBy": "admin@mail.com",
            "paymentMethod": "PayPal",
            "totalPrice": 200,
            "status": 2,
        },
        {
            "id": 763,
            "companyId": 777,
            "created": "2020-10-02",
            "createdBy": "admin@mail.com",
            "paymentMethod": "PayPal",
            "totalPrice": 200,
            "status": 2,
        }]);
    }
    deleteOrderData(orderId: number): Observable<IOrderAdmin[]> {
        return of([{
            "id": 763,
            "companyId": 777,
            "created": "2020-10-02",
            "createdBy": "admin@mail.com",
            "paymentMethod": "PayPal",
            "totalPrice": 200,
            "status": 2,
        }]);
    }

}