import { IMovie } from './../../interfaces/IMovie';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ICartService {
  sendToCart(cartItem: IMovie): void;
  removeFromCard(cartList: IMovie[]): void;
}
@Injectable({
  providedIn: 'root'
})

export class CartService implements ICartService {
  private cartList: IMovie[] = [];
  private defaultCart = new BehaviorSubject<IMovie[]>(this.cartList);
  defaultCart$ = this.defaultCart.asObservable();

  //Update the cart
  sendToCart(cartItem: IMovie) {
    this.cartList.push(cartItem);
    this.defaultCart.next(this.cartList);
  }

  //Remove from the cart
  removeFromCard(cartList: IMovie[]) {
    this.cartList = [];
    this.cartList = cartList;
    this.defaultCart.next(this.cartList);
  }

  constructor() { }
}
