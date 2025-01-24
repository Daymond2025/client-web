import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

    constructor(
        private http: HttpClient,
        //  private configService: Configurable
        ) {
       
      }
    public create(lePost: any) {
        return this.http.post('https://v2.daymondboutique.com/api/v2/seller/order/offline', lePost, {
          observe: 'response',
        });
      }
}