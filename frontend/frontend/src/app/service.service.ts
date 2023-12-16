import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

// api='http://localhost:7000/api'
api='/api'
  
  create(data:any){
    return this.http.post(`${this.api}/create`,data)
  }

  get(){
    return this.http.get(`${this.api}/get`)
  }

  update(data:any){
    return this.http.put(`${this.api}/update/${data._id}`,data)
  }

  delete(id:string){
    return this.http.delete(`${this.api}/delete/${id}`)
  }
}
