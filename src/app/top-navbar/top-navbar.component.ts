import { Component, OnInit, AfterViewInit,ViewEncapsulation,ViewChild,HostBinding ,Inject, ElementRef } from '@angular/core';
import { categories } from '../static/categories';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


import { DOCUMENT } from '@angular/common';


enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

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
      //OVERLAY ANIMATION
      trigger('messageAnimation', [

      state('visible', 
        style({

          opacity: 1.0,
          transform: 'translateX(0%)',
        }),
      ),

      state('hidden',   style({
        opacity: 0,
        transform: 'translateX(-100%)',
      })),

      transition('hidden => visible', animate('800ms 300ms ease')),
      transition('visible => hidden', animate('200ms ease-out'))

    ]),

    //TOGGLE TOP BAR STATE
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({
          //height : '0px',
          background : 'rgba(63, 81, 181, 1)',

        })
      ),
      state(
        VisibilityState.Visible,
        style({
            //height : '*',
            background : 'rgba(63, 81, 181, 1)',
        })
      ),
      transition('* => *', animate('400ms ease-in'))
    ]),
    
    //TOP BAR CATEGORIES ANIMATION :
    trigger('titleFade',[
      state('visible',
          style({
          opacity : 1.0,


        })
      ),state('hidden',
        style({
          opacity : 0,
          
        })
      ),
      transition('* => *', animate('100ms ease-in'))

    ]),
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
