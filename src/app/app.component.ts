import { IMovie } from './interfaces/IMovie';
import { CartService } from './services/cart/cart.service';
import { Component } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webshop';
  cLength: number = 0;

  //FontAwesome icons
  filmIcon = faFilm;
  cartIcon = faShoppingCart;
  cogsIcon = faCogs;

  constructor(private CartService: CartService) {
  }

  ngOnInit() {
    //Get number of ths items in the cart
    this.CartService.defaultCart$.subscribe((cartLength: IMovie[]) => {
      this.cLength = cartLength.length
    });
  }

}

