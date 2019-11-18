import { Component, OnInit, AfterViewInit, OnDestroy, Inject, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { technologiesCardHover, floatingContainer } from '../../assets/animations';


import{ technologies } from '../static/services';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [technologiesCardHover,floatingContainer]
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
 
  technologies = technologies
  states: Array<boolean> = [false,false,false,false,false,false];
  swiperStates: Array<boolean> = [false,false,false,false,false,false];
  contactFormState = 'active';

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  @ViewChild('swiperContainer',{static:false}) public swiper : any;
  public show: boolean = true;
  public type: string = 'component';
  public currentSlideIndex = 0;


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

  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer){

    for(let technology of technologies){
      this.matIconRegistry.addSvgIcon(
      technology.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(technology.source),
    );


    }
    
  }


  ngOnInit() {
    this.swiperStates[0]=true;
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.contactFormState = 'inactive';
    }, 1000);
  }


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

  onCardClick(index){
    console.log(this.swiper.directiveRef.instance.slideTo(index));

  }



  ngOnDestroy(){
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
    console.log('Swiper event: ', event);
  }

  

  
}
