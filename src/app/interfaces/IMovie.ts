import { IProductCategory } from './IProductCategory';

export interface IMovie {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    year: number;
    productCategory: IProductCategory[];
}