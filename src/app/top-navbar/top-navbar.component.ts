import { Component,Input, OnInit, ViewEncapsulation,ViewChild, HostListener, ElementRef } from '@angular/core';
import { categories } from '../static/categories';



@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
 
})
export class TopNavbarComponent implements OnInit {
  

  @ViewChild('MobielOverlay' , {static: true}) overlay : ElementRef;
  

  title = 'Website Title';


  categories = categories ;

  openNav(){ 

    this.overlay.nativeElement.style.width = "100%"
  }

  closeNav(){ 

    this.overlay.nativeElement.style.width = "0%"
  }


  @Input()
  hasBackdrop: false;

  constructor() { 


  }

  ngOnInit() {

    console.log(this.overlay);
  }

}
