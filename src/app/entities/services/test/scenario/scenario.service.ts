import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private http: HttpClient) { }

  postScenario(data : any){
    return this.http.post<any>("http://51.77.132.116:3001/scenarioManager", data);
  }

  getAllScenario(){
    return this.http.get<any>("http://51.77.132.116:3001/scenarioManager");
  }

  getAllScenarioForCasTest(id: number){
    return this.http.get<any>("http://51.77.132.116:3001/scenarioManager/casTest/"+id);
  }

  putScenario(data : any, id : number){
    return this.http.put<any>("http://51.77.132.116:3001/scenarioManager/"+id, data);
  }

  deleteScenario(id : number){
    return this.http.delete<any>("http://51.77.132.116:3001/scenarioManager/"+id);
  }
  
}
