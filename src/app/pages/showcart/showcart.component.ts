import { IMovie } from './../../interfaces/IMovie';
import { CartService } from '../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';

import { faCreditCard, faDollarSign, faExclamationCircle, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-showcart',
  templateUrl: './showcart.component.html',
  styleUrls: ['./showcart.component.scss']
})

export class ShowcartComponent implements OnInit {
  //Fontawesome
  creditCardIcon = faCreditCard;
  dollarIcon = faDollarSign;
  statusIcon = faExclamationCircle;
  cartIcon = faShoppingCart;
  removeIcon = faTrash;


  defaultShowCart: IMovie[] = [];
  totalPrice: number = 0;
  numOfIndex: number;
  found: IMovie;
  newCartList: IMovie[] = [];
  cartList: IMovie[] = [];

  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    //Get and present cart items
    this.CartService.defaultCart$.subscribe((cartItems: IMovie[]) => {
      this.defaultShowCart = cartItems;
      cartItems.forEach((price) => {
        this.totalPrice = this.totalPrice + price.price;
      })
    });
  }

  //Remove items from cart
  removeItem(cartItemId) {
    this.CartService.defaultCart$.subscribe((items: IMovie[]) => {
      this.cartList = items;
    });

    this.found = this.cartList.find((item: IMovie) => {
      return item.id === cartItemId;
    });

    this.numOfIndex = this.cartList.indexOf(this.found);
    this.cartList.splice(this.numOfIndex, 1);
    this.newCartList = this.cartList;

    this.CartService.removeFromCard(this.newCartList);

    this.totalPrice = 0;
    this.newCartList.forEach(p => {
      this.totalPrice = this.totalPrice + p.price;
    });
  }
}
