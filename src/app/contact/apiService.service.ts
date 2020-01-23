import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

 

const apiUrl = 'https://a-gabtni.herokuapp.com/contact'
const testUrl = 'localhost:3000/contact'
 
@Injectable()
export class APIService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint

    sendContactRequest(body){

        return this.http.post(apiUrl,body);

    }




}