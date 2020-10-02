import { BehaviorSubject } from 'rxjs';
import { IMovie } from '../../interfaces/IMovie';
import { ICartService } from './cart.service';

export default class CartServiceMock implements ICartService {
    private cartList: IMovie[] = [];
    private defaultCart = new BehaviorSubject<IMovie[]>(this.cartList);
    defaultCart$ = this.defaultCart.asObservable();

    sendToCart(cartItem: IMovie): void {
        throw new Error('Method not implemented.');
    }
    removeFromCard(cartList: IMovie[]): void {
        throw new Error('Method not implemented.');
    }

}