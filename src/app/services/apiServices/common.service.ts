import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  private onlineUrl = environment.onlineUrl;

  constructor(private http: HttpClient) {}

  commonPoint(paramsData: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(paramsData).forEach(key => {
      if (paramsData[key] !== null && paramsData[key] !== '') {
        params = params.set(key, paramsData[key]);
      }
    });

    return this.http.get<any>(this.onlineUrl, { params });
  }
}
