import { Component, OnInit, AfterViewInit, OnDestroy, Inject, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { MatIconRegistry } from "@angular/material/icon";
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { DomSanitizer } from "@angular/platform-browser";



import { technologiesCardHover, floatingContainer, contentFadeIn, logoFadeIn } from '../../assets/animations';
import{ technologies } from '../static/services';
import { ContactFormMobileComponent } from '../contact-form-mobile/contact-form-mobile.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [technologiesCardHover, floatingContainer, contentFadeIn, logoFadeIn]
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer',{static:false}) public swiper : any;
  technologies = technologies

  states: Array<boolean> = [false,false,false,false,false,false];
  swiperStates: Array<boolean> = [false,false,false,false,false,false];
  
  

  
  contactFormState = 'active';

  currentSlideIndex = 0;
  mobile = false;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 3,
    speed : 800,
    effect : 'coverflow',
    coverflowEffect: {
      rotate:60,
      depth:80,
      slideShadows: false,
    },
    spaceBetween : -20,
    centeredSlides : true,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
    autoHeight: false,
    freeMode : true,

  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };


  //Registering local SVGs
  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,private _bottomSheet: MatBottomSheet){

    for(let technology of technologies){
      this.matIconRegistry.addSvgIcon(
      technology.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(technology.source),
    );


    }
    
  }


  ngOnInit() {
    this.swiperStates[0]=true;
    if(window.screen.width <= 480){
      this.mobile = true;

    }


    console.log(this.mobile);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.contactFormState = 'inactive';
    }, 1000);
  }


  ngOnDestroy(){


  }




  //Loop animation
  onEnd(event) {
    this.contactFormState = 'active';
    if (event.toState === 'active') {
      setTimeout(() => {
        this.contactFormState = 'inactive';
      }, 0);
    }
  }

  onMouseOver(){


  }

  //On swiper cards click
  onCardClick(index){
    this.swiper.directiveRef.instance.slideTo(index)

  }



  
  //Swiper slide change
  public onIndexChange(index: number): void {
    this.swiperStates[index]=true;
    if(this.currentSlideIndex < index){
      this.swiperStates[index-1] = false;
    }
    if(this.currentSlideIndex > index){
      this.swiperStates[index+1]= false;

    }
    
    this.currentSlideIndex = index;
  }


  //Swiper event
  public onSwiperEvent(event: string): void {
    
  }



  //Open contact form bottom sheet :
  openContactSheet() : void {
    this._bottomSheet.open(ContactFormMobileComponent);

  }
  

  
}
