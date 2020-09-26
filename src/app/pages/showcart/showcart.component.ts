import { ProductService } from './../../services/products/product.service';
import { IOrder } from './../../interfaces/IOrder';
import { IRow } from './../../interfaces/IRow';
import { IMovie } from './../../interfaces/IMovie';
import { CartService } from '../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCreditCard, faDollarSign, faExclamationCircle, faShoppingCart, faTrash, faAddressCard, faMoneyCheck} from '@fortawesome/free-solid-svg-icons';

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
  emailIcon = faAddressCard;
  paymentIcon = faMoneyCheck;

  //check-out Validation
  registerForm: FormGroup;
  submitted = false;
  selected: string = 'PayPal';

  defaultShowCart: IMovie[] = [];
  totalPrice: number = 0;
  numOfIndex: number;
  found: IMovie;
  newCartList: IMovie[] = [];
  cartList: IMovie[] = [];
  currentCart: any;
  FilteredCurrShopCart: IRow[] = [];
  shopCartObj: IRow[] = [];

  constructor(private CartService: CartService, private formBuilder: FormBuilder, private ProductService: ProductService) { }

  ngOnInit(): void {
    //Get and present cart items
    this.CartService.defaultCart$.subscribe((cartItems: IMovie[]) => {
      this.defaultShowCart = cartItems;
      cartItems.forEach((price) => {
        this.totalPrice = this.totalPrice + price.price;
      });
    });

    //Form Email
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
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

  //Form Validation
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    //Call the cart
    this.CartService.defaultCart$.subscribe((cartItm: IMovie[]) => {
      this.currentCart = cartItm;
    });

    //Push new properties
    this.currentCart.forEach((obj: IMovie) => {
      this.shopCartObj.push({ 'ProductId': obj.id, 'Amount': 1 });
    });

    //Validation
    this.shopCartObj.forEach((element: IRow) => {
      const checkAvailable = this.FilteredCurrShopCart.find((el: IRow) => {
        return el.ProductId === element.ProductId;
      });

      if (!!checkAvailable && element.ProductId === checkAvailable.ProductId) {
        const newAmount = checkAvailable.Amount + 1;

        const selectedProductItemIndex = this.FilteredCurrShopCart.findIndex((el: IRow) => {
          return el.ProductId === element.ProductId;
        });
        this.FilteredCurrShopCart[selectedProductItemIndex] = { ...element, Amount: newAmount };
      } else {
        this.FilteredCurrShopCart.push(element);
      }
    });

    //Get Total price
    this.totalPrice = 0;
    this.newCartList.forEach(p => {
      this.totalPrice = this.totalPrice + p.price;
    });

    //Post Object
    const postObject: IOrder = {
      companyId: 777,
      created: '0001-01-01T00:00:00',
      createdBy: JSON.stringify(this.registerForm.value),
      paymentMethod: this.selected,
      totalPrice: this.totalPrice,
      status: 2,
      orderRows: this.FilteredCurrShopCart
    }

    //Call psot function
    this.ProductService.addProduct(postObject).subscribe(hero => console.log(hero));

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value) + this.selected)
  }
}
