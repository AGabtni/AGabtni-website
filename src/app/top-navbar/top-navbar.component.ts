import { Component, OnInit, ViewEncapsulation,ViewChild, ElementRef,Inject } from '@angular/core';
import { categories } from '../static/categories';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations : [

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
    

  ]
 
})
export class TopNavbarComponent implements OnInit {
  

  @ViewChild('MobielOverlay' , {static: true}) overlay : ElementRef;
  @ViewChild('body' , {static: true}) body : ElementRef;
  

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

  ngOnInit() {

    console.log(this.body);
  }

}
