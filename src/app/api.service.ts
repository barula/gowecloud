import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../../auth_config.json';
//import { ObsClient} from 'esdk-obs-nodejs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // Import the OBS library.
// Use npm to install the client.
//var ObsClient = require('esdk-obs-nodejs');
// Use source codes to install the client.
// var ObsClient = require('./lib/obs');

// Create an instance of ObsClient.

  ping$(): Observable<any> {
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/external`);
  }

  getSuscriptions$(appCode): Observable<any> {
    const options = {
      // host: 'jsonplaceholder.typicode.com',
      // path: '/users?_limit=2',
      // method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Apig-AppCode':appCode
      }
    };
    console.log(config.marketApi);
    return this.http.get(`${config.marketApi}/getSuscriptions`, options);
  }

}
