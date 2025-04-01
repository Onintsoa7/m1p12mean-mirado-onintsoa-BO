import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoitureService } from '../../core/services/frontoffice/voiture.service';
import { Voiture } from '../../core/models/voiture';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

@Component({
  selector: 'app-profil-data',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './profil-data.component.html',
  styleUrls: ['./profil-data.component.scss']
})
export class ProfilDataComponent implements OnInit {

  @Output() carFormClicked = new EventEmitter<void>();
  @Output() activeFactureClicked = new EventEmitter<void>();

  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';

  voituresByUser = new MatTableDataSource<any>([]);
  visits = new MatTableDataSource<any>([
    { id:'0', car: 'Mazda', date: '02-05-2025', service: 'Réparation' },
    { id:'1', car: 'Mercedes', date: '02-05-2025', service: 'Entretien' }
  ]);

  @ViewChild('paginatorVoitures') paginatorVoitures!: MatPaginator;
  @ViewChild('paginatorVisites') paginatorVisites!: MatPaginator;

  displayedColumnsVoitures = ['marque', 'modele', 'annee', 'immatriculation', 'typeCarburant', 'puissance', 'kilometrage', 'action'];
  displayedColumnsVisites = ['car', 'date', 'service', 'details'];

  constructor(
    private voitureService: VoitureService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getVoituresListe();
  }

  ngAfterViewInit() {
    this.voituresByUser.paginator = this.paginatorVoitures;
    this.visits.paginator = this.paginatorVisites;
  }

  getVoituresListe(): void {
    this.voitureService.getVoitureByUserId(this.id).subscribe((result: Voiture | Voiture[]) => {
      const voitures = Array.isArray(result) ? result : [result];
      this.voituresByUser.data = voitures;
    });
  }

  onCarFormClick() {
    this.carFormClicked.emit();
  }

  onFactureClick() {
    this.activeFactureClicked.emit();
  }

  openDeleteConfirmationDialog(carId: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { message: 'Voulez-vous vraiment supprimer cette voiture ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.voitureService.deleteVoiture(carId).subscribe({
          next: () => {
            this.getVoituresListe();
            this.snackBar.open('Voiture supprimée avec succès !', 'Fermer', { duration: 3000, panelClass: ['success-snackbar'] });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de la voiture :', err);
            this.snackBar.open('Erreur lors de la suppression de la voiture.', 'Fermer', { duration: 3000, panelClass: ['error-snackbar'] });
          }
        });
      }
    });
  }
}
