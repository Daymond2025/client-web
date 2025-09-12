import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WinningClickService {
  private apiUrl = 'https://v2.daymondboutique.com/api/v2/winning-clicks';

  constructor(private http: HttpClient) {}

  /**
   * Enregistrer un clic gagnant
   * @param cloneId ID du product clone
   * @param data { client_identifier, condition }
   */
  public create(cloneId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cloneId}`, data, {
      observe: 'response',
    });
  }
}
