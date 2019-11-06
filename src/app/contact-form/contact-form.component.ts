import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as AOS from 'aos';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
	
	emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  projectTypeControl = new FormControl('', [Validators.required]);
  projectTypes : string[] = [
      "type1",
      "type2",
      "type3",
  ];

  matcher = new MyErrorStateMatcher();
  	

  ngOnInit() {
    AOS.init();
  }

}
