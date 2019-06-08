import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SellerComponent } from './seller/seller.component';
import { NewSellerComponent } from './new-seller/new-seller.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CityService } from './services/city.service';
import { SellerService } from './services/seller.service';
import { RegionService } from './services/region.service';
import { PartService } from './services/part.service';
import { PriceService } from './services/price.service';
import { OrderService } from './services/order.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PartComponent } from './part/part.component';
import { NewPartComponent } from './new-part/new-part.component';
import { PriceComponent } from './price/price.component';
import { NewPriceComponent } from './new-price/new-price.component';
import { OrderComponent } from './order/order.component';
import { NewOrderComponent } from './new-order/new-order.component';

const appRoutes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'seller/list',
    component: SellerComponent
  },
  {
    path: 'seller/list/:query',
    component: SellerComponent,
    data: {title: 'List of Sellers'}
  }, 
  {
    path: 'seller/new',
    component: NewSellerComponent,
    data: {title: 'New Seller'}
  },
  {
    path: 'seller/new/:id',
    component: NewSellerComponent,
    data: {title: 'Update Seller'}
  },
  {
    path: 'seller/remove',
    component: SellerComponent,
    data: {title: 'Remove Seller'}
  },
  { 
    path: 'part/list',
    component: PartComponent
  },
  { 
    path: 'part/new',
    component: NewPartComponent
  },
  { 
    path: 'part/new/:id',
    component: NewPartComponent
  },
  { 
    path: 'price/list',
    component: PriceComponent
  },
  { 
    path: 'price/new',
    component: NewPriceComponent
  },
  { 
    path: 'price/new/:id',
    component: NewPriceComponent
  },
  { 
    path: 'order/list',
    component: OrderComponent
  },
  { 
    path: 'order/new',
    component: NewOrderComponent
  },
  { 
    path: 'order/new/:id',
    component: NewOrderComponent
  },
  { 
    path: '**',
    component: NotFoundComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    SellerComponent,
    NewSellerComponent,
    HomeComponent,
    PartComponent,
    NewPartComponent,
    NotFoundComponent,
    PriceComponent,
    NewPriceComponent,
    OrderComponent,
    NewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })
    ],
  providers: [CityService, RegionService, SellerService, PartService, PriceService, OrderService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
