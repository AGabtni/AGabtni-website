import { Component, OnInit,OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {cardHover} from '../../assets/animations';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [cardHover]
})
export class ServicesComponent implements OnInit, OnDestroy {
 

  states: Array<boolean> = [false,false,false,false,false,false];

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  	
  }


  ngOnDestroy(){
  }


}
