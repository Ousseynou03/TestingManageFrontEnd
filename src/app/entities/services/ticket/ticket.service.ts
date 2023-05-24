import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  postTicket(data : any){
    return this.http.post<any>("http://51.77.132.116:3001/ticketManager", data);
  }

  getAllTicket(){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager");
  }

  getVisionTicket(id: number){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager/visionsTicket/"+id);
  }

  getVisionBloquante(id: number){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager/visionsBloquante/"+id);
  }

  getVisionMajeuret(id: number){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager/visionsMajeure/"+id);
  }

  getVisionMineure(id: number){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager/visionsMineure/"+id);
  }

  getAllTicketForRelease(id:number){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager/ticketRelease/"+id);
  }

  getTicket(id:number){
    return this.http.get<any>("http://51.77.132.116:3001/ticketManager/"+id);
  }

  putTicket(data : any, id : number){
    return this.http.put<any>("http://51.77.132.116:3001/ticketManager/"+id, data);
  }

  deleteTicket(id : number){
    return this.http.delete<any>("http://51.77.132.116:3001/ticketManager/"+id);
  }
}
