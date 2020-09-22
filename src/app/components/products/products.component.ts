import { ICategory } from './../../interfaces/ICategory';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IMovie } from '../../interfaces/IMovie';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

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

  //Search clear
  @ViewChild('userSearchInput', { static: false })
  InputClear: ElementRef;

  movieList: IMovie[] = [];
  categoryList: ICategory[] = [];
  categoryById: ICategory[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    let category: ICategory[] = [];

    //Call getMovieData function from productService
    this.productService.getMovieData().subscribe((movie: IMovie[]) => {
      this.movieList = movie;
      console.log(movie);
    });

    //Call getCategoryData function from productService
    this.productService.getCategoryData().subscribe((cate: ICategory[]) => {
      category = cate.filter((obj) => {
        return obj.name != null;
      });
      this.categoryList = category;
    });
  }

  //Call getCategoryDataById function from productService
  categoryFilter(id: number) {
    let catId: number = 0;
    let filtredMov: IMovie[] = [];

    this.productService.getCategoryData().subscribe((cateId: ICategory[]) => {
      this.categoryById = cateId.filter((obj) => {
        return obj.id === id;
      });
      this.categoryById.forEach((i) => {
        catId = i.id;
      });
      this.productService.getMovieData().subscribe((movie: IMovie[]) => {
        movie.forEach(mov => {
          mov.productCategory.forEach(movCat => {
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
}
