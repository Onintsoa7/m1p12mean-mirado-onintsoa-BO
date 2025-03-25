import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormBuilder, FormGroup , FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
interface Mecanicien {
  key: string;
  name: string;
  age: number;
  address: string;
  heuresParJour: { [date: string]: number };
}

@Component({
  selector: 'app-mecanicien',
  standalone: true,
  imports: [
    CommonModule,
    NzDividerModule,
    NzTableModule,
    NgxEchartsModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,   
    NzInputModule
  ],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.scss'
})
export class MecanicienComponent {
  selectedMecanicien: Mecanicien | null = null;
  echartOption: any = {};
  moisFiltre: Date = new Date();
  mecForm = false;
  mecaniciensData: Mecanicien[] = [
    {
      key: '1',
      name: "Jean Rakoto",
      age: 30,
      address: "Antananarivo",
      heuresParJour: {
        // Fevrier 2025
        "2025-02-01": 5, "2025-02-02": 6, "2025-02-03": 7, "2025-02-04": 5,
        "2025-02-05": 6, "2025-02-06": 0, "2025-02-07": 6, "2025-02-08": 5,
        "2025-02-09": 4, "2025-02-10": 6, "2025-02-11": 5, "2025-02-12": 0,
        "2025-02-13": 0, "2025-02-14": 6, "2025-02-15": 7, "2025-02-16": 5,
        "2025-02-17": 5, "2025-02-18": 6, "2025-02-19": 0, "2025-02-20": 0,
        "2025-02-21": 6, "2025-02-22": 5, "2025-02-23": 4, "2025-02-24": 6,
        "2025-02-25": 6, "2025-02-26": 0, "2025-02-27": 0, "2025-02-28": 6,
        // Mars 2025
        "2025-03-01": 6, "2025-03-02": 5, "2025-03-03": 7, "2025-03-04": 4,
        "2025-03-05": 6, "2025-03-06": 5, "2025-03-07": 8, "2025-03-08": 0,
        "2025-03-09": 0, "2025-03-10": 6, "2025-03-11": 5, "2025-03-12": 7,
        "2025-03-13": 4, "2025-03-14": 6, "2025-03-15": 5, "2025-03-16": 0,
        "2025-03-17": 7, "2025-03-18": 5, "2025-03-19": 6, "2025-03-20": 4,
        "2025-03-21": 6, "2025-03-22": 0, "2025-03-23": 0, "2025-03-24": 7,
        "2025-03-25": 6, "2025-03-26": 5, "2025-03-27": 7, "2025-03-28": 4,
        "2025-03-29": 0, "2025-03-30": 0, "2025-03-31": 6,
    
      }
    },
    {
      key: '2',
      name: "Jean Yves",
      age: 30,
      address: "Antananarivo",
      heuresParJour: {
        "2025-03-01": 5,
        "2025-03-02": 4,
        "2025-03-03": 6,
        "2025-03-04": 5,
        "2025-03-05": 5,
        "2025-03-06": 6,
        "2025-03-07": 7,
        "2025-03-08": 0,
        "2025-03-09": 0,
        "2025-03-10": 6,
        "2025-03-11": 5,
        "2025-03-12": 5,
        "2025-03-13": 4,
        "2025-03-14": 6,
        "2025-03-15": 4,
        "2025-03-16": 0,
        "2025-03-17": 7,
        "2025-03-18": 5,
        "2025-03-19": 5,
        "2025-03-20": 5,
        "2025-03-21": 6,
        "2025-03-22": 0,
        "2025-03-23": 0,
        "2025-03-24": 6,
        "2025-03-25": 5,
        "2025-03-26": 6,
        "2025-03-27": 5,
        "2025-03-28": 4,
        "2025-03-29": 0,
        "2025-03-30": 0,
        "2025-03-31": 5
      }
    },
    {
      key: '3',
      name: "Liva Andry",
      age: 35,
      address: "Mahajanga",
      heuresParJour: {
        "2025-03-01": 7,
        "2025-03-02": 6,
        "2025-03-03": 6,
        "2025-03-04": 6,
        "2025-03-05": 5,
        "2025-03-06": 7,
        "2025-03-07": 6,
        "2025-03-08": 0,
        "2025-03-09": 0,
        "2025-03-10": 7,
        "2025-03-11": 6,
        "2025-03-12": 6,
        "2025-03-13": 6,
        "2025-03-14": 6,
        "2025-03-15": 5,
        "2025-03-16": 0,
        "2025-03-17": 6,
        "2025-03-18": 5,
        "2025-03-19": 5,
        "2025-03-20": 5,
        "2025-03-21": 6,
        "2025-03-22": 0,
        "2025-03-23": 0,
        "2025-03-24": 7,
        "2025-03-25": 7,
        "2025-03-26": 6,
        "2025-03-27": 6,
        "2025-03-28": 5,
        "2025-03-29": 0,
        "2025-03-30": 0,
        "2025-03-31": 6
      }
    }
  ];
  disableFutureMonth = (current: Date): boolean => {
    const today = new Date();
    const currentMonth = current.getMonth();
    const currentYear = current.getFullYear();
  
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
  
    // Si année future OU même année mais mois futur => désactivé
    return currentYear > todayYear || (currentYear === todayYear && currentMonth > todayMonth);
  };

  

  get listOfData(): Mecanicien[] {
    return this.mecaniciensData;
  }

  onSelectMecanicien(m: Mecanicien): void {
    this.mecForm = false;
    this.selectedMecanicien = m;
    this.mettreAJourGraphique();
  }

  mettreAJourGraphique(): void {
    this.mecForm = false;
    if (!this.selectedMecanicien || !this.moisFiltre) return;
  
    const mois = this.moisFiltre.getMonth();
    const annee = this.moisFiltre.getFullYear();
  
    const series = Object.entries(this.selectedMecanicien.heuresParJour)
      .filter(([dateStr, _]) => {
        const date = new Date(dateStr);
        return date.getMonth() === mois && date.getFullYear() === annee;
      })
      .map(([date, heures]) => ({ date, heures }));
  
    this.echartOption = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: series.map(d => d.date),
        name: 'Date'
      },
      yAxis: {
        type: 'value',
        name: 'Heures'
      },
      series: [
        {
          data: series.map(d => d.heures),
          type: 'line',
          smooth: true,
          name: this.selectedMecanicien.name
        }
      ]
    };
  }

  mecanicienForm: FormGroup;

constructor(private fb: FormBuilder) {
  this.mecanicienForm = this.fb.group({
    nom: ['', Validators.required],
    dateNaissance: [null, Validators.required],
    adresse: ['', Validators.required],
    cin: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
    contact: ['', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]]
  });
}

disableFutureDate = (current: Date): boolean => {
  return current > new Date();
};

onSubmit(): void {
  if (this.mecanicienForm.valid) {
    console.log('✅ Mécanicien à enregistrer :', this.mecanicienForm.value);
    // ➕ Tu peux ensuite l’ajouter à `mecaniciensData` ici si besoin
  } else {
    console.warn('⛔ Formulaire invalide');
  }
}

  activateMecForm():void{
    this.mecForm =true
  }
}
