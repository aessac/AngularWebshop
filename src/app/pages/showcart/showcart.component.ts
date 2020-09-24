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
  updatedList: IMovie[] = [];
  totalPrice: number = 0;

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
      this.updatedList = items.filter((item: IMovie) => {
        return item.id != cartItemId;
      });

      this.totalPrice = 0;
      this.updatedList.forEach(n => {
        this.totalPrice = this.totalPrice + n.price
      })
    });
    this.CartService.removeFromCard(this.updatedList);
  }
}
