import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TopNavbarComponent } from './top-navbar/top-navbar.component';

import  { MatGridListModule, MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HighlightsCarouselComponent } from './highlights-carousel/highlights-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TopNavbarComponent,
    HighlightsCarouselComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent, TopNavbarComponent]
})


export class AppModule { 


}
