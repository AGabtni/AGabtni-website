import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';


/**
  custom components
*/

import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { HighlightsCarouselComponent } from './highlights-carousel/highlights-carousel.component';
import { ProductComponent } from './product/product.component';



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import  { MatGridListModule, 
          MatToolbarModule, 
          MatSidenavModule, 
          MatMenuModule, 
          MatIconModule, 
          MatCardModule, 
          MatListModule,
          MatExpansionModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductHighlightComponent } from './product-highlight/product-highlight.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TopNavbarComponent,
    HighlightsCarouselComponent,
    ProductHighlightComponent,
    FooterComponent
    
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
    MatExpansionModule,
    FlexLayoutModule,
    NgbModule,
    SlickCarouselModule,
    AnimateOnScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent, TopNavbarComponent,FooterComponent]
})


export class AppModule { 


}
