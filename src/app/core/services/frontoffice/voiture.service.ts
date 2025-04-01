import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Voiture } from '../../models/voiture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) { }

  getVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(Constants.VOITURE_API);
  }

  getVoitureByUserId(idUser: string): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${Constants.VOITURE_API}/${idUser}`);
  }

  getVoitureById(idUser: string, id: string): Observable<Voiture> {
    return this.http.get<Voiture>(`${Constants.VOITURE_API}/${idUser}/${id}`);
  }

  addVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.post<Voiture>(`${Constants.VOITURE_API}/`, voiture);
  }

  updateVoiture(id: string, voiture: Voiture): Observable<Voiture> {
    return this.http.put<Voiture>(`${Constants.VOITURE_API}/${id}`, voiture);
  }
  
  deleteVoiture(id: string): Observable<any> {
    return this.http.delete<any>(`${Constants.VOITURE_API}/${id}`);
  }
  
}
