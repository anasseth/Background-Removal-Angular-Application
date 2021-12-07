import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemovalAIService {

  httpOptions: any;

  constructor(
    public _http: HttpClient
  ) { }

  convertImageUsingFreeRapidAPI(data:string) {
    this.httpOptions = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'background-removal.p.rapidapi.com',
      'x-rapidapi-key': '47f28bb9f5msh5076ad1bd081279p175211jsn990379680bef'
    })

    console.log("Data : ", data)
    console.log("Header : ", this.httpOptions)

    return this._http.post<any>(
      environment.rapidAPI,
      data,
      {
        headers: this.httpOptions
      }
    )
      .pipe(catchError(this.errorHandler))
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
