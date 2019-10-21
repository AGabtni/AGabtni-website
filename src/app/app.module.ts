import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


/**
  custom components
*/

import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { HighlightsCarouselComponent } from './highlights-carousel/highlights-carousel.component';
import { ProductComponent } from './product/product.component';



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import  { MatGridListModule, MatToolbarModule, MatSidenavModule, MatMenuModule, MatIconModule, MatCardModule, MatListModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductHighlightComponent } from './product-highlight/product-highlight.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TopNavbarComponent,
    HighlightsCarouselComponent,
    ProductHighlightComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    FlexLayoutModule,
    NgbModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent, TopNavbarComponent]
})


export class AppModule { 


}
