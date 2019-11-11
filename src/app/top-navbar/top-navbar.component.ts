import { Component, OnInit, AfterViewInit,ViewEncapsulation,ViewChild,HostBinding ,Inject, ElementRef } from '@angular/core';
import { categories } from '../static/categories';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';

import { categorySlide, toggleBar, topCategoryFade } from '../../assets/animations'
import { DOCUMENT } from '@angular/common';




enum Direction {
  Up = 'Up',
  Down = 'Down'
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

  private isVisible = true;

  title = 'Website Title';
  hidden = true;
  categories = categories ;




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



  constructor(@Inject(DOCUMENT) private document: any) { 
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    scrollUp$.subscribe(() => (this.isVisible = true));
    scrollDown.subscribe(() => (this.isVisible = false));
  }
}
