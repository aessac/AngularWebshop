import { Observable, of } from 'rxjs';
import { IMovie } from '../../interfaces/IMovie';
import { IMovieService } from './product.service';

export default class ProductServiceMock implements IMovieService {
    getMovieData(): Observable<IMovie[]> {
        return of([{
            "id": 76,
            "name": "The Dark Knight",
            "description": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice",
            "price": 199,
            "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
            "year": 2008,
            "added": "2016-01-05T00:00:00",
            "productCategory": [
                {
                    "categoryId": 5,
                    "category": null
                },
                {
                    "categoryId": 6,
                    "category": null
                }
            ]
        }, {
            "id": 78,
            "name": "Le fabuleux destin d'Amélie Poulain",
            "description": "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
            "price": 100,
            "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
            "year": 2001,
            "added": "2017-07-10T00:00:00",
            "productCategory": [
                {
                    "categoryId": 7,
                    "category": null
                }
            ]
        }]);
    }

    addProduct(product: any): Observable<any[]> {
        throw new Error('Method not implemented.');
    }
    
    getSearchData(searchString: string): Observable<IMovie[]> {
        throw new Error('Method not implemented.');
    }

    productDetail(MovieId: number): Observable<IMovie> {
        throw new Error('Method not implemented.');
    }

}