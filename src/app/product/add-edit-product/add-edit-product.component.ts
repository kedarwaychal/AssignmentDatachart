import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnChanges,OnInit{

  @Input() displayAddModal:boolean =true;
  @Output() clickClose:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedProduct:any;
  @Input() product: any;

  productForm = this.fb.group({
    title: ["",Validators.required],
    price: [0,Validators.required],
    description: [""],
    category:["",Validators.required],
    image:["",Validators.required],
  })


  modalType:any;


  constructor(private fb:FormBuilder,private productService:ProductService,private messageService:MessageService){}

  ngOnInit(): void {
   this.idProduct()
  }

  idProduct(){
    this.productService.getProducts().subscribe((response)=>{
        console.log(response)
    })
  }

  closemodal(){
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  hideAddModal(isClosed:boolean){
      this.displayAddModal = !isClosed;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedProduct){
      this.productForm.patchValue(this.selectedProduct);
      this.modalType = 'Edit'
    }else{
      this.productForm.reset();
      this.modalType = 'Add'
    }
  }




  addProduct(){
  //  let nextId;
  //   this.productService.getProducts().subscribe((response)=>{
  //         nextId = response.length + 1;
  //   })
        const newProduct = {
          id:this.product.length+1, 
          ...this.productForm.value
        }



      this.productService.saveproduct(newProduct,this.selectedProduct).subscribe(
        response =>{
      console.log(response);
          this.clickAdd.emit(response);
          this.productService.addProduct(response);
          const msg = this.modalType === 'Add' ? 'Product added' : 'Product updated';
          this.messageService.add({severity:'success',summary:'success',detail:'via MessageService'})
          // this.productForm.reset();
          // this.clickClose.emit(true);
          this.closemodal()
        },
        error =>{
          this.messageService.add({severity:'error',summary:'Error',detail:'error'})
        }
      )
  }

}
