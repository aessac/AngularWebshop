import { IMovie } from './../../interfaces/IMovie';
import { ProductService } from './../../services/products/product.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsComponent } from './products.component';
import ProductServiceMock from '../../services/products/product.service.mock';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let movie: IMovie = {
    "id": 76,
    "name": "The Dark Knight",
    "description": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice",
    "price": 199,
    "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
    "year": 2008,
    "productCategory": [
      {
        "categoryId": 5,
      },
      {
        "categoryId": 6,
      }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ProductService, useClass: ProductServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should track movieList get data from API on load', () => {
    expect(component.movieList.length).toBe(2);
  });

  it('should track categoryFilter was not called', function () {
    spyOn(component, 'categoryFilter');
    expect(component.categoryFilter).not.toHaveBeenCalled();
  });

  it('should track categoryFilterReset was not called', function () {
    spyOn(component, 'categoryFilterReset');
    expect(component.categoryFilterReset).not.toHaveBeenCalled();
  });

  it('should track clearSearch was not called', function () {
    spyOn(component, 'clearSearch');
    expect(component.clearSearch).not.toHaveBeenCalled();
  });

  it('should track searchProduct was called', function () {
    spyOn(component, 'searchProduct');
    component.searchProduct('movie');
    expect(component.searchProduct).toHaveBeenCalled();
  });

  it('should track that the sendItemToCart was called', function () {
    spyOn(component, 'sendItemToCart');
    component.sendItemToCart(movie);
    expect(component.sendItemToCart).toHaveBeenCalled();
  });
});
