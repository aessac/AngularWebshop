import { IMovie } from './../../interfaces/IMovie';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartList: IMovie[] = [];
  private defaultCart = new BehaviorSubject<IMovie[]>(this.cartList);
  defaultCart$ = this.defaultCart.asObservable();


  //Update the cart
  sendToCart(cartItem: IMovie) {
    this.cartList.push(cartItem)
    this.defaultCart.next(this.cartList);
  }

  removeFromCard(updatedList: IMovie[]) {
    this.cartList = [];
    this.cartList = updatedList;
    this.defaultCart.next(this.cartList);
  }

  constructor() { }
}
