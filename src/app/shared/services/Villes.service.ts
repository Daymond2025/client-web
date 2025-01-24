import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

    constructor(
        private http: HttpClient,
        //  private configService: Configurable
        ) {
       
      }
    public get() {
        return this.http.get('https://v2.daymondboutique.com/api/v2/params/data/offline?option=city', {
          observe: 'response',
        //   params: lePost
        });
      }
}