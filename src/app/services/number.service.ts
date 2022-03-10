import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  private apiURL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getNumbers(ip: string): Observable<object> {
    if (localStorage.getItem(ip)) {
      return of(JSON.parse(localStorage.getItem(ip)))
    } else {
      const url = `${this.apiURL}/${ip}`;

      return this.http.get<object>(url).pipe(
        tap((res) => {
          if (Object.keys(res).length === 0) {
            alert('No data for this ip address!');
          } else {
            localStorage.setItem(ip, JSON.stringify(res));
          }
        }),
        catchError((err) => {
          console.log(err);
          alert('No data for this ip address!');
          return throwError('Cannot getNumbers');
        })
      );
    }
  }
}
