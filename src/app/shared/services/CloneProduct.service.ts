import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class CloneProductService {

    constructor(
        private http: HttpClient,
        //  private configService: Configurable
        ) {
       
      }
    public get(lePost: any) {
        return this.http.get('https://v2.daymondboutique.com/api/v2/seller/share/product-clone/'+lePost, {
          observe: 'response',
        //   params: lePost
        });
      }
}