import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasService {

  constructor(private http: HttpClient) { }

  postCasTest(data : any){
    return this.http.post<any>("http://51.77.132.116:3001/casTestManager", data);
  }

  getAllCasTest(){
    return this.http.get<any>("http://51.77.132.116:3001/casTestManager");
  }

  getCasTest(id : number){
    return this.http.get<any>("http://51.77.132.116:3001/casTestManager/"+id);
  }

  putCasTest(data : any, id : number){
    return this.http.put<any>("http://51.77.132.116:3001/casTestManager/"+id, data);
  }

  deleteCasTest(id : number){
    return this.http.delete<any>("http://51.77.132.116:3001/casTestManager/"+id);
  }

  getVisionCasTest(id: number){
    return this.http.get<any>("http://51.77.132.116:3001/casTestManager/visionCasTest/"+id);
  }

}
