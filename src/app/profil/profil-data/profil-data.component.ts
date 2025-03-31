import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoitureService } from '../../core/services/frontoffice/voiture.service';
import { Voiture } from '../../core/models/voiture';

@Component({
  selector: 'app-profil-data',
  imports: [CommonModule],
  templateUrl: './profil-data.component.html',
  styleUrl: './profil-data.component.scss'
})
export class ProfilDataComponent implements OnInit {

  @Output() carFormClicked = new EventEmitter<void>();
  @Output() activeFactureClicked = new EventEmitter<void>();

  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';
  voituresByUser: any[] = [];
  constructor(private voitureService: VoitureService) { }

  ngOnInit():void{
    this.getVoituresListe();
  }
  getVoituresListe():void{
    this.voitureService.getVoitureByUserId(this.id).subscribe((result: Voiture | Voiture[]) => {
      const voitures = Array.isArray(result) ? result : [result];
      this.voituresByUser = voitures.map(voiture => ({
        _id: voiture._id,
        marque: voiture.marque,
        modele: voiture.modele,
        annee: voiture.annee,
        immatriculation: voiture.immatriculation,
        typeCarburant: voiture.typeCarburant,
        puissance: voiture.puissance,
        kilometrage: voiture.kilometrage,
        proprietaire: voiture.proprietaire
      }));
    });
  }

  onCarFormClick() {
    this.carFormClicked.emit();
  }
  onFactureClick() {
    console.log("ato");
    this.activeFactureClicked.emit();
  }
  visits = [
    { id:'0',car: 'Mazda', date: '02-05-2025', service: 'Réparation' },
    { id:'1',car: 'Mercedes', date: '02-05-2025', service: 'Entretien' }
  ];
  cars = [
    { brand: 'Mazda', year: 2019, number: '1905TAE' },
    { brand: 'Mercedes', year: 2012, number: '1767TAE' }
  ];
}
