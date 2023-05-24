import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnomalieService {

  constructor(private http: HttpClient) { }

  postAnomalie(data : any){
    return this.http.post<any>("http://51.77.132.116:3001/anomalieManager", data);
  }

  getAllAnomalie(){
    return this.http.get<any>("http://51.77.132.116:3001/anomalieManager");
  }

  putAnomalie(data : any, id : number){
    return this.http.put<any>("http://51.77.132.116:3001/anomalieManager/"+id, data);
  }

  getAnomalie(id : number){
    return this.http.get<any>("http://51.77.132.116:3001/anomalieManager/"+id);
  }

  deleteAnomalie(id : number){
    return this.http.delete<any>("http://51.77.132.116:3001/anomalieManager/"+id);
  }
}
