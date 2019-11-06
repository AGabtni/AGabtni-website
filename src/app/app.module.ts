import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


/**
  custom components
*/

import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { HighlightsCarouselComponent } from './highlights-carousel/highlights-carousel.component';
import { ProductComponent } from './product/product.component';



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';


//ANGULAR MATERIAL IMPORTS
import  { MatGridListModule, 
          MatToolbarModule, 
          MatSidenavModule, 
          MatMenuModule, 
          MatInputModule,
          MatIconModule, 
          MatCardModule, 
          MatListModule,
          MatExpansionModule,
          MatSelectModule} from '@angular/material';


import  { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductHighlightComponent } from './product-highlight/product-highlight.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ContactFormComponent } from './contact-form/contact-form.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TopNavbarComponent,
    HighlightsCarouselComponent,
    ProductHighlightComponent,
    FooterComponent,
    ContactComponent,
    HomeComponent,
    ContactFormComponent
    
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
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    ScrollingModule,
    SlickCarouselModule,
    AnimateOnScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent, TopNavbarComponent]
})


export class AppModule { 
  

}
