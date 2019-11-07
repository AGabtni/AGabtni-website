import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
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
  contactForm ;


  isOverForm = false;
  formState ;
  
  //NEED TO BE FILLED IN
  projectTypes : string[] = [
      "type1",
      "type2",
      "type3",
  ];


	emailFormControl = new FormControl('', [ Validators.required , Validators.email]);
  projectTypeControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();


  
  constructor(public renderer: Renderer, private formBuilder : FormBuilder){

    this.formState = 'shakeend';
    this.contactForm = this.formBuilder.group({
        'firstName' : this.nameControl,
        'lastName' : '',
        'email' : this.emailFormControl,
        'phone' : '',
        'companyName' : '',
        'projectType' : this.projectTypeControl,
        'description' : '',

    });

  }
  ngOnInit() {
    AOS.init();

    
  }


  onFormSubmit(clientInfo){
    console.log(clientInfo);
    
    if(this.emailFormControl.status == 'VALID' &&  this.projectTypeControl.status == 'VALID' && this.projectTypeControl.status == 'VALID'){
      this.formState = 'submittedForm';
      this.contactForm.reset();
    }else
      this.formState= (this.formState === 'shakestart' ? 'shakeend' : 'shakestart');

    


  }


  shakeEnd(event) {
    this.formState = 'shakeend';
  }

 


  //For trigerring on hover form animation
  onFormMouseOver(){
    this.isOverForm = true;

  }

  onFormMouseQuit(){
    this.isOverForm = false;
  }




}
