import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment'; // Ajusta la ruta según tu estructura de proyecto

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private apiUrl = `${environment.apiUrl}/api/Encryption`;

  constructor(private http: HttpClient) {}

  // Método POST - Encriptar una cadena de texto
  encrypt(data: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/encrypt`, { data });
  }

  // Método POST - Desencriptar una cadena de texto
  decrypt(encryptedData: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/decrypt`, { encryptedData });
  }
}
