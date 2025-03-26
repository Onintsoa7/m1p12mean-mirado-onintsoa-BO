import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profil-facture',
  imports: [CommonModule],
  templateUrl: './profil-facture.component.html',
  styleUrl: './profil-facture.component.scss'
})
export class ProfilFactureComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  factureNumero = 'FF0121';
  dateFacture = '01/02/2025';

  client = {
    nom: 'RAZAFINDRATANDRA Miradomahefa Fitahiana',
    adresse: 'LOT IIIL 104 Bis',
    contact: '+261345864714'
  };

  prestations = [
    {
      description: 'vidange voiture simple',
      quantite: 1,
      prix: 40000,
      tva: 0.2
    },
    {
      description: 'Changement de disques et de plaquettes frein avants',
      quantite: 1,
      prix: 80000,
      tva: 0.2
    }
  ];

  get sousTotalHT(): number {
    return this.prestations.reduce((total, item) => total + (item.prix * item.quantite), 0);
  }

  get montantTVA(): number {
    return this.prestations.reduce((total, item) => total + (item.prix * item.quantite * item.tva), 0);
  }

  get montantTotal(): number {
    return this.sousTotalHT + this.montantTVA;
  }

  downloadPDF(): void {
    if (!this.pdfContent) {
      console.error('pdfContent est introuvable');
      return;
    }
  
    const data = this.pdfContent.nativeElement;
    const marginTop = 10; // ✅ marge haute en mm
  
    html2canvas(data, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
  
      const pageWidth = pdf.internal.pageSize.getWidth();   // 297mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 210mm
  
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
      // ✅ On décale vers le bas, et on garde tout visible
      pdf.addImage(imgData, 'PNG', 0, marginTop, imgWidth, imgHeight);
      pdf.save(`facture-${this.factureNumero}.pdf`);
    });
  }
  
}
