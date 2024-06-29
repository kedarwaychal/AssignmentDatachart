import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {HttpClientModule} from "@angular/common/http";
import { TableModule } from 'primeng/table';
import {ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MenubarModule } from 'primeng/menubar'; 
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    ProductComponent,
    BarChartComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    AddEditProductModule,
    ToastModule,
    NgxChartsModule,
    MenubarModule  ],
  exports:[
    ProductComponent
  ],
  providers:[
    MessageService
  ]
})
export class ProductModule { }
