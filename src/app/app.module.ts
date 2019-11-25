import { NgModule } from '@angular/core';
import  { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParallaxDirective } from './directives/parallax.directive';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
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
          MatSelectModule,
          MatButtonModule,
          MatSnackBarModule,

          MatBottomSheetModule} from '@angular/material';




/**
  custom components
*/

import { TopNavbarComponent , WindowRef } from './top-navbar/top-navbar.component';
import { HighlightsCarouselComponent } from './highlights-carousel/highlights-carousel.component';
import { ProductComponent } from './product/product.component';
import { ProductHighlightComponent } from './product-highlight/product-highlight.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ServicesComponent } from './services/services.component';


import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ContactFormMobileComponent, SnackBarComponent } from './contact-form-mobile/contact-form-mobile.component';
import { InteractiveLobbyComponent } from './interactive-lobby/interactive-lobby.component';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


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
    ContactFormComponent,
    ServicesComponent,
    ParallaxDirective,
    ContactFormMobileComponent,  
    SnackBarComponent, InteractiveLobbyComponent,
  ],
  entryComponents: [ContactFormMobileComponent,SnackBarComponent],

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
    MatButtonModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    ScrollingModule,
    HttpClientModule, 
    SwiperModule,
    AngularSvgIconModule,
    AnimateOnScrollModule.forRoot()
  ],
  providers: [{
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,


    }, WindowRef ],
  bootstrap: [AppComponent, TopNavbarComponent]
})


export class AppModule { 
  

}
