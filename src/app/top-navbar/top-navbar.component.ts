import { Component, 
          OnInit, 
          AfterViewInit,
          ViewEncapsulation,
          ViewChild,
          HostListener ,
          Inject,
          Injectable, 
          ElementRef, 
           } from '@angular/core';

import { categories } from '../static/categories';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';

import { categorySlide, toggleBar, topCategoryFade } from '../../assets/animations'


import { DOCUMENT } from '@angular/common';







function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class WindowRef {
   get nativeWindow() : any {
      return _window();
   }
}



@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations : [
      categorySlide, 
      toggleBar, 
      topCategoryFade
    ]
 })



export class TopNavbarComponent implements AfterViewInit {
    
  @ViewChild('MobielOverlay' , {static: true}) overlay : ElementRef;
  @ViewChild('Carousel' , {static: true}) toolbar : any;
  
  private isVisible = true;
  title = 'Website Title';
  hidden = true;
  categories = categories ;


  //Listener for window scroll event
  @HostListener("window:scroll"
  , [])
    onWindowScroll() {
        if(400>this.winRef.nativeWindow.pageYOffset){
            this.isVisible = true;
         
        }
        else{
            this.isVisible = false;
        }
    }


  constructor(@Inject(DOCUMENT) private document: any, private winRef: WindowRef) { 
  }

  ngAfterViewInit() {
  } 


  //Mobile overlay controls
  openNav(){ 
    this.document.body.style.overflow = "hidden";
    this.overlay.nativeElement.style.width = "100%"
    this.hidden = false;
  }

  closeNav(){ 
    this.hidden = true;
    this.document.body.style.overflow = "unset";
    this.overlay.nativeElement.style.width = "0%"
  }



 
}
