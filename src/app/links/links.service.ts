import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Link } from './link.model';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  apiUri: string

  constructor(
    private http: HttpClient
  ) {
    this.apiUri = environment.apiUri
  }

  get(){
    return this.http.get<Link[]>(`${this.apiUri}/links`)
  }

  create(data: Link){
    return this.http.post(`${this.apiUri}/links`, data)
  }

  delete(id: number|string){
    return this.http.delete(`${this.apiUri}/links/${id}`)
  }
  
}
