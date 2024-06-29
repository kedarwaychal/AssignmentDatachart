import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges{

  @Input() products : any[] =[];
  data: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // this.productService.getProducts().subscribe(products => {
    //   this.updateChartData(products);
    // });

    this.productService.products$.subscribe(products => {
      this.updateChartData(products);
    });
  }


 
    
  





  updateChartData(products: Product[]) {
    this.data = products.map(product => ({
      name: product.title,
      value: product.price
    }));
  }

  ngOnChanges(changes: SimpleChanges){
      if(changes['products'] && changes['products'].currentValue){
        console.log('hii')
              this.data = this.products.map(product =>({
                name: product.title,
                value: product.price
              }))
      }
  }

  // saveProductToList(newData:Product[]){
  //      this.data = newData;
  // }

}
