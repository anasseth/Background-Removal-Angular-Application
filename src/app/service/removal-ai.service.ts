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

  convertImageUsingRemovalAI(data: any) {
    this.httpOptions = new HttpHeaders({
      'Rm-Token': environment.removalAiToken,
    })
    return this._http.post<any>(
      environment.removalAI,
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
