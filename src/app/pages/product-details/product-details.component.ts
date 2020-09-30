import { ICategory } from './../../interfaces/ICategory';
import { CategoryService } from './../../services/categories/category.service';
import { IProductCategory } from './../../interfaces/IProductCategory';
import { IMovie } from './../../interfaces/IMovie';
import { CartService } from './../../services/cart/cart.service';
import { ProductService } from './../../services/products/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faShoppingCart, faArchive, faDollarSign, faPlayCircle, faComment, faTags } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  DefaultDetailList: IMovie[] = [];
  categoryTitle: string[] = [];
  catTitle: ICategory[] = [];

  archiveIcon = faArchive;
  cartIcon = faShoppingCart;
  moneyIcon = faDollarSign;
  movieIcon = faPlayCircle;
  descIcon = faComment;
  catIcon = faTags;
  doesProductIdExists: boolean = false;
  
  constructor(private route: ActivatedRoute, private ProductService: ProductService, private CartService: CartService, private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    //Call getCategoryById function
    this.ProductService.productDetail(this.id).subscribe((movie: IMovie) => {
      this.DefaultDetailList.push(movie);

      if (this.DefaultDetailList.length > 0) {
        this.doesProductIdExists = true;
      }

      movie.productCategory.forEach((category: IProductCategory) => {
        this.CategoryService.getCategoryById(category.categoryId).subscribe((cat: ICategory) => {
          this.catTitle.push(cat);
        });
      });
    });
  }

  //Send item to cartService
  sendItemToCart(addedItem: IMovie) {
    this.CartService.sendToCart(addedItem);
  }
}
