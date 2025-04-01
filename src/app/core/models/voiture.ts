export interface Voiture {
  _id?: string;
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  typeCarburant: 'Essence' | 'Diesel' | 'Hybride' | 'Électrique';
  puissance?: number;
  kilometrage?: number;
  proprietaire: string; // ID utilisateur
}
