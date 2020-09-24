import { CartService } from './../../services/cart/cart.service';
import { IProductCategory } from './../../interfaces/IProductCategory';
import { CategoryService } from './../../services/categories/category.service';
import { ICategory } from './../../interfaces/ICategory';
import { ProductService } from './../../services/products/product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IMovie } from '../../interfaces/IMovie';
import { faShoppingCart, faDollarSign, faPlayCircle, faComment, faTags, faFilm, faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  //Fontawesome
  cartIcon = faShoppingCart;
  moneyIcon = faDollarSign;
  movieIcon = faPlayCircle;
  descIcon = faComment;
  catIcon = faTags;
  clearIcon = faUndo;
  showAllIcon= faFilm;

  //Search clear
  @ViewChild('userSearchInput', { static: false })
  InputClear: ElementRef;

  movieList: IMovie[] = [];
  categoryList: ICategory[] = [];
  categoryById: ICategory[] = [];

  constructor(private productService: ProductService, private CategoryService: CategoryService, private CartService: CartService) { }

  ngOnInit(): void {
    let category: ICategory[] = [];

    //Call getMovieData function from productService
    this.productService.getMovieData().subscribe((movie: IMovie[]) => {
      this.movieList = movie;
    });

    //Call getCategoryData function from productService
    this.CategoryService.getCategoryData().subscribe((cate: ICategory[]) => {
      category = cate.filter((obj: ICategory) => {
        return obj.name != null;
      });
      this.categoryList = category;
    });
  }

  //Call getCategoryDataById function from productService
  categoryFilter(id: number) {
    let catId: number = 0;
    let filtredMov: IMovie[] = [];

    this.CategoryService.getCategoryData().subscribe((cateId: ICategory[]) => {
      this.categoryById = cateId.filter((obj: ICategory) => {
        return obj.id === id;
      });
      this.categoryById.forEach((i: ICategory) => {
        catId = i.id;
      });
      this.productService.getMovieData().subscribe((movie: IMovie[]) => {
        movie.forEach((mov: IMovie) => {
          mov.productCategory.forEach((movCat: IProductCategory) => {
            if (movCat.categoryId === catId) {
              filtredMov.push(mov);
            }
          })
        })
      });
      this.movieList = filtredMov;
    });
  }

  //Reset category filter
  categoryFilterReset() {
    this.productService.getMovieData().subscribe((movie: IMovie[]) => {
      this.movieList = movie;
    });
  }

  //Search function
  searchProduct(searchInput: string) {
    //Validation
    if (searchInput != '') {
      this.productService.getSearchData(searchInput).subscribe((result: IMovie[]) => {
        if (result.length != undefined) {
          this.movieList = result;
        }
      });
    } else {
      this.productService.getMovieData().subscribe((movie: IMovie[]) => {
        this.movieList = movie;
      });
    }
  }

  //Clear function
  clearSearch() {
    this.productService.getMovieData().subscribe((movie: IMovie[]) => {
      this.movieList = movie;
    });

    this.InputClear.nativeElement.value = '';
  }

  //Send item to cartService
  sendItemToCart(addedItem: IMovie) {
    this.CartService.sendToCart(addedItem);
  }
}
