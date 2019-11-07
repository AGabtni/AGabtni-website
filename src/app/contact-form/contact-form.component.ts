import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as AOS from 'aos';

import { formCard, shake, fadeAway } from '../../assets/animations';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  animations: [ formCard , shake, fadeAway ],
})
export class ContactFormComponent implements OnInit {

  @ViewChild ('formContainer',{static : true}) formContainer : ElementRef;
  isOverForm = false;
  isFormValidated = true;
  states = {};
  
  //NEED TO BE FILLED IN
  projectTypes : string[] = [
      "type1",
      "type2",
      "type3",
  ];


	emailFormControl = new FormControl('', [ Validators.required , Validators.email]);
  projectTypeControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();


  
  constructor(public renderer: Renderer){

    this.states['state1'] = 'shakeend';
  }

  shakeMe(stateVar: string) {
    if(!this.isFormValidated)
        this.states[stateVar] = (this.states[stateVar] === 'shakestart' ? 'shakeend' : 'shakestart');
    else
      this.states[stateVar] = 'submittedForm';



    console.log(this.states[stateVar]);
  }

  shakeEnd(stateVar: string, event) {
    this.states[stateVar] = 'shakeend';
  }

  ngOnInit() {
    AOS.init();

    
  }



  onFormMouseOver(){
    this.isOverForm = true;

  }

  onFormMouseQuit(){
    this.isOverForm = false;
  }




}
