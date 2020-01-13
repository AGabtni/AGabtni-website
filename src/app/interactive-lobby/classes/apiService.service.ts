import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class APIService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    getScores() {
        return this.http.get('https://infinite-runner-api.herokuapp.com/scores');
    }


    saveScore(name, score){


        var body = {

            "name" : name,
            "score": score,
        }
        return this.http.post('https://infinite-runner-api.herokuapp.com/scores',body);

    }

}