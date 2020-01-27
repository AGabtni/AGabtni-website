import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

 


const apiUrl = 'https://a-gabtni.herokuapp.com/scores'
 
@Injectable()
export class APIService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    getScores() {
        return this.http.get(apiUrl);
    }


    saveScore(name, score){

        var body = {

            "name" : name,
            "score": score,
        }
        return this.http.post(apiUrl,body);

    }




}