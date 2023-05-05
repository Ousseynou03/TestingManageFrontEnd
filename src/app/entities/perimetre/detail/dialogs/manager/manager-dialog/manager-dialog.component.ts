import { Component, Inject } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ITesteur } from 'src/app/entities/manager/manger.model';
import { AnomalieService } from 'src/app/entities/services/anomalie/anomalie.service';
import { ReleaseService } from 'src/app/entities/services/release/release.service';
import { CasService } from 'src/app/entities/services/test/cas/cas.service';
import { ScenarioService } from 'src/app/entities/services/test/scenario/scenario.service';
import { TicketService } from 'src/app/entities/services/ticket/ticket.service';
import { TesteurService } from 'src/app/entities/testeur/service/testeur.service';

@Component({
  selector: 'app-manager-dialog',
  templateUrl: './manager-dialog.component.html',
  styleUrls: ['./manager-dialog.component.scss']
})
export class ManagerDialogComponent {

  [x: string]: any;

  items!: MenuItem[];

  listTesteur!: ITesteur[];

  testeur: any;

  casTest: any;

  anomalie: any;
    
  subscription!: Subscription;

  FormGroup2!:FormGroup;

  FormGroup3!:FormGroup;

  FormGroup5!:FormGroup;

  
  
  FormGroup6 = this._formBuilder.group({
    resultat: [null],
    scenario: [null]
  });
  
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, public testeurService : TesteurService, 
    public releaseService : ReleaseService, public ticketService : TicketService, public casTestService : CasService,
    public scenarioService : ScenarioService,
    public anomalieService : AnomalieService, public fb: FormBuilder,
    public router : Router, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public editData : any,  
    private dialogRef : MatDialogRef<ManagerDialogComponent>) {}

  ngOnInit() {
    this.FormGroup2 = this._formBuilder.group({
      titre: [null, Validators.required],
      type: [null, Validators.required],
      testeur: new FormControl(null),
      release: [],
      anomalies: [],
      casDeTest: []
      
    });
  
    this.FormGroup3 = this._formBuilder.group({
      resultat: [null]
    });
  
    
    this.FormGroup5 = this._formBuilder.group({
      cloturee: [null],
      criticite: [null],
      enCours: [null],
      priorite: [null],
      statut: [null],
    });

    this.isLinear = true;
    this.testeurService.getAllTesteur()
      .subscribe(response => {
        this.listTesteur = response;
      });
    if (this.editData.idC!==null) {
      this.casTestService.getCasTest(Number(this.editData.idC))
      .subscribe({
        next:(value) =>{
            this.casTest=value;
            this.FormGroup3.controls['resultat'].setValue(this.casTest['resultat']);
        },
      })
    }
    
    if(this.editData.idA!==null){
      this.anomalieService.getAnomalie(Number(this.editData.idA))
      .subscribe({
        next:(value) =>{
            this.anomalie=value;
            this.FormGroup5.controls['cloturee'].setValue(this.anomalie['cloturee']);
            this.FormGroup5.controls['criticite'].setValue(this.anomalie['criticite']);
            this.FormGroup5.controls['enCours'].setValue(this.anomalie['enCours']);
            this.FormGroup5.controls['priorite'].setValue(this.anomalie['priorite']);
            this.FormGroup5.controls['statut'].setValue(this.anomalie['statut']);
        },
      })
    }
    

      if(this.editData){
        this.FormGroup2.controls['titre'].setValue(this.editData.row.titre);
        this.FormGroup2.controls['type'].setValue(this.editData.row.type);
        // alert(this.editData.row.testeur['idTesteur']);
        // this.FormGroup2.controls['testeur'].setValue(this.editData.row.testeur['testeur']);
      }
      this.testeurService.getAllTesteur()
      .subscribe({
        next:(value) =>{
            this.listTesteur=value;
        },
      })

    }
  
  

  updatePerimetreManager(){
    if (this.FormGroup2.value.titre !==null && this.FormGroup2.value.type!==null && this.FormGroup2.value.testeur!==null) {
      if (this.FormGroup3.value.resultat!==null) {
        if (this.FormGroup5.value.cloturee!==null || this.FormGroup5.value.criticite!==null || this.FormGroup5.value.enCours!==null ||
          this.FormGroup5.value.priorite!==null || this.FormGroup5.value.statut!==null) {
          this.casTestService.putCasTest(this.FormGroup3.value, this.editData.idC)
          .subscribe({
            next:(value1) =>{
                this.anomalieService.putAnomalie(this.FormGroup5.value, this.editData.idA)
                .subscribe({
                  next:(value2) =>{
                    this.releaseService.getRelease(Number(this.editData.idR))
                    .subscribe({
                      next:(value) =>{
                          this.FormGroup2.value.release=value;
                          this.FormGroup2.value.casDeTest=value1;
                          this.FormGroup2.value.anomalies=value2;
                          this.ticketService.putTicket(this.FormGroup2.value, this.editData.row.refTicket)
                          .subscribe({
                            next:(value) =>{
                                alert("Ticket Modifier avec Succès!!!");
                                this.dialogRef.close();
                            },
                          })
                      },
                    })
                  },
                })
            },
          })
        }
        else{
          this.casTestService.putCasTest(this.FormGroup3.value, this.editData.idC)
          .subscribe({
            next:(value1) =>{
                this.releaseService.getRelease(Number(this.editData.idR))
                .subscribe({
                  next:(value) =>{
                      this.FormGroup2.value.release=value;
                      this.FormGroup2.value.casDeTest=value1;
                      this.ticketService.putTicket(this.FormGroup2.value, this.editData.row.refTicket)
                      .subscribe({
                        next:(value) =>{
                          alert("Ticket Modifier avec Succès!!!");
                          this.dialogRef.close();
                        },
                      })
                  },
                })
            },
          })
        }
      }

      else if(this.FormGroup5.value.cloturee!==null || this.FormGroup5.value.criticite!==null || this.FormGroup5.value.enCours!==null ||
        this.FormGroup5.value.priorite!==null || this.FormGroup5.value.statut!==null){
        this.anomalieService.putAnomalie(this.FormGroup5.value, this.editData.idA)
        .subscribe({
          next:(value1) =>{
            this.releaseService.getRelease(Number(this.editData.idR))
            .subscribe({
              next:(value2) =>{
                  this.FormGroup2.value.release=value2;
                  this.FormGroup2.value.anomalies=value1;
                  this.ticketService.putTicket(this.FormGroup2.value, this.editData.row.refTicket)
                  .subscribe({
                    next:(value) =>{
                        alert("Ticket Modifier avec Succès!!!");
                        this.dialogRef.close();
                    },
                  })
              },
            })
              
          },
        })
      }

      else if (this.FormGroup5.value.cloturee!==null && this.FormGroup5.value.criticite!==null && this.FormGroup5.value.enCours!==null &&
        this.FormGroup5.value.priorite!==null && this.FormGroup5.value.statut!==null && this.FormGroup3.value.resultat!==null){
          this.releaseService.getRelease(Number(this.editData.idR))
          .subscribe({
            next:(value) =>{
                this.FormGroup2.value.release=value;
                this.ticketService.putTicket(this.FormGroup2.value, this.editData.row.refTicket)
                .subscribe({
                  next:(value) =>{
                      alert("Ticket Modifier avec succès!!!");
                      this.dialogRef.close();
                  },
                })
            },
          })
      }
      
      else {
        this.releaseService.getRelease(Number(this.editData.idR))
        .subscribe({
          next:(value) =>{
            this.FormGroup2.value.release=value;
            this.ticketService.putTicket(this.FormGroup2.value, this.editData.row.refTicket)
            .subscribe({
              next:(value) =>{

                alert("Ticket Modifier avec Succès!!!");
                this.dialogRef.close();

                if (this.editData.idA!==null) {
                  this.anomalieService.deleteAnomalie(Number(this.editData.idA))
                  .subscribe({
                    next:(value) =>{
                        alert("Anomalie modifié avec succès");
                    },
                  })
                }

              },
            })
          },
        })

      }

    } 
    else {
      alert("Il faut au moins remplir tous les champs de ticket!!!")
    }
  }
}
