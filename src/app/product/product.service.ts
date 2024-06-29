import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public products$: Observable<any[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }


  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products?sort=desc');
  }

  get products(): any[] {
    return this.productsSubject.getValue();
  }

  set products(value: any[]) {
    this.productsSubject.next(value);
  }

  addProduct(product: any) {
    this.products = [...this.products, product];
  }

  deleteProduct(ele:any){
      this.products =ele;
  }

  saveproduct(postdata:any,selectedProduct:any){
    if(!selectedProduct){
    return this.http.post('https://fakestoreapi.com/products',postdata)
  }else{
    return this.http.put(`https://fakestoreapi.com/products/${selectedProduct.id}`,postdata)
  }

}
}