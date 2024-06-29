import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../product';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products : Product[] = [];
  displayAddModal: boolean =false;
  selectedProduct:any;

  constructor(private productService:ProductService){}

  ngOnInit():void{
      this.getProduct()
  }

  getProduct(){
    this.productService.getProducts().subscribe(response =>{
      this.products =response;
      console.log(response)
    })
  }

  showDialog(){
    this.displayAddModal= true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed :boolean){
    this.displayAddModal = !isClosed;
  }

  saveProductToList(newData:any){
    console.log(newData)
      if(this.selectedProduct){
        const productInd = this.products.findIndex(data => data.id === newData.id);
        this.products[productInd] = newData;
      }else{
        newData.id = this.products.length + 1;
      this.products.unshift(newData);
      }
  }

  editProduct(product:any){
    this.displayAddModal =true;
    this.selectedProduct = product;
  }

  deleteProduct(product:any){
    let delProdId = product.id;

    const index = this.products.findIndex(product => product.id === delProdId);

if (index !== -1) {
  this.products.splice(index, 1);
}

this.productService.deleteProduct(this.products);
}
}
