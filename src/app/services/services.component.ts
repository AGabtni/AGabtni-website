import { Component, OnInit,OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
 
  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
