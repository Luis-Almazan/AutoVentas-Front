import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bitacora } from './models/Models'; 
import { environment } from '../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = `${environment.apiUrl}/api/Bitacora`; 
  

  constructor(private http: HttpClient) {}

  obtenerBitacoras(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(`${this.apiUrl}/ObtenerBitacoras`);
  }
}
