import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AnomalieService } from 'src/app/entities/services/anomalie/anomalie.service';
import { ReleaseService } from 'src/app/entities/services/release/release.service';
import { CasService } from 'src/app/entities/services/test/cas/cas.service';
import { ScenarioService } from 'src/app/entities/services/test/scenario/scenario.service';
import { TicketService } from 'src/app/entities/services/ticket/ticket.service';
import { AnomalieDialogComponent } from '../dialogs/anomalie/anomalie-dialog/anomalie-dialog.component';
import { CasTestDialogComponent } from '../dialogs/casTest/cas-test-dialog/cas-test-dialog.component';
import { ManagerDialogComponent } from '../dialogs/manager/manager-dialog/manager-dialog.component';
import { TicketDialogComponent } from '../dialogs/ticket/ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-detail-release',
  templateUrl: './detail-release.component.html',
  styleUrls: ['./detail-release.component.scss']
})
export class DetailReleaseComponent implements OnInit{

  id!: number;
  detail: any;
  info: any;

  displayedColumnsTicket: string[] = ['titre', 'type', 'testeur','casTest', 'scenario', 'cloture','criticite','cours','priorite', 'statut', 'action'];
  dataSourceTicket!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginatorTicket!: MatPaginator;
  @ViewChild(MatSort) sortTicket!: MatSort;


  displayedColumnsAnomalie: string[] = ['id', 'refAnomalie', 'titreAnomalie', 'criticiteAnomalie','motifAnomalie','statutAnomalie','prioriteAnomalie','action'];
  dataSourceAnomalie!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginatorAnomalie!: MatPaginator;
  @ViewChild(MatSort) sortAnomalie!: MatSort;

  
  constructor(private anomalieService: AnomalieService, private ticketService: TicketService, private releaseService: ReleaseService,
  private casTestService: CasService, public dialog: MatDialog, private scenarioService: ScenarioService,
          protected activatedRoute: ActivatedRoute,
          protected router: Router,){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.info = this.activatedRoute.snapshot.paramMap.get('nomRelase');
    });

    if(this.id){
      this.getAllTicket(this.id);
    }
  }

  // Partie Ticket
  getAllTicket(id:number){
    this.ticketService.getAllTicketForRelease(id)
    .subscribe({
      next: (res) =>{
        this.dataSourceTicket = new MatTableDataSource(res);
        this.dataSourceTicket.paginator = this.paginatorTicket;
        this.dataSourceTicket.sort = this.sortTicket; 
      },
    })
  }

  ngAfterViewInit() {
    if(this.paginatorTicket === undefined){
      this.dataSourceTicket.paginator = this.paginatorTicket;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTicket.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTicket.paginator) {
      this.dataSourceTicket.paginator.firstPage();
    }
  }

  editDialogTicket(row: any, idR:number, idC:number|null, idA: number|null){ 
    this.dialog.open(ManagerDialogComponent, {
      width: '50%',
      data: {row, idR, idC, idA}
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

  ajoutDialogTicket(id: number){ 
    this.dialog.open(TicketDialogComponent,{
      data:{id},
      width: '50%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

  ajoutDialogAnomalie(id: number){ 
    this.dialog.open(AnomalieDialogComponent, {
      data:{id},
      width: '50%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

  ajoutDialogaCasTest(id: number){ 
    this.dialog.open(CasTestDialogComponent, {
      data:{id},
      width: '50%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }


  deleteTicket(id: number, idC: number, idA:number){
    if ((idC!==null && idA!==null)) {
      this.ticketService.deleteTicket(id)
        .subscribe({
          next:(_res) =>{
            this.anomalieService.deleteAnomalie(idA)
            .subscribe({
              next:(_value) =>{
                this.casTestService.deleteCasTest(idC)
                .subscribe({
                  next:(_value) =>{
                    alert("Ticket, Anomalie, Cas De Test supprimés avec succès!!!");
                    this.getAllTicket(this.id); 
                  },
                })
              },
            })    
          },
        })
        alert("Ticket, Anomalie supprimés avec succès!!!");
        this.getAllTicket(this.id);
      }
      else if((idC!==null && idA===null)){
        this.ticketService.deleteTicket(id)
            .subscribe({
              next:(_res) =>{
                this.casTestService.deleteCasTest(idC)
                .subscribe({
                  next:(_value) =>{
                  },
                })
              },
            })
            alert("Ticket, Cas De Test supprimés avec succès!!!");
            this.getAllTicket(this.id);
      }
      else if((idC===null && idA!==null)){
        this.ticketService.deleteTicket(id)
            .subscribe({
              next:(_res) =>{
                this.anomalieService.deleteAnomalie(idC)
                .subscribe({
                  next:(_value) =>{
                    
                  },
                })
              },
            })
            alert("Ticket, Anomalies supprimés avec succès!!!");
            this.getAllTicket(this.id);
      }
      else{
        this.ticketService.deleteTicket(id)
        .subscribe({
          next:(_res) =>{
              alert("Ticket supprimé avec succès!!!");
              this.getAllTicket(this.id);
          },
          error:()=>{
            this.getAllTicket(this.id);
          }
        })
        alert("Ticket supprimé avec succès!!!");
        this.getAllTicket(this.id);
      }
  }

  // Partie Anomalie
  getAllAnomalie(){
    this.anomalieService.getAllAnomalie()
    .subscribe({
      next: (res) =>{
        this.dataSourceAnomalie = new MatTableDataSource(res);
        this.dataSourceAnomalie.paginator = this.paginatorAnomalie;
        this.dataSourceAnomalie.sort = this.sortAnomalie; 
      },
    })
  }

  deleteAnomalie(id: number){
    this.anomalieService.deleteAnomalie(id)
    .subscribe({
      next:(_res) =>{
          this.getAllAnomalie();
      },
    })
  }
  
}
