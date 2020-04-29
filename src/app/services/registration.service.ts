import { Injectable } from '@angular/core';
import { Registration } from '../shared/registration';
import { Login } from '../shared/login';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
// import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(registration: Registration): Observable<Registration> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Registration>(baseURL + 'api/users/', registration, httpOptions);
  }


  loginUser(login: Login): Observable<Login> {
    return this.http.post<Login>(baseURL + 'auth/', login);
  }
  
}
