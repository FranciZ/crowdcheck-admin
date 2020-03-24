import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PaginationModule } from 'ngx-bootstrap';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PaginationModule,
    MomentModule
  ]
})
export class HomeModule { }
