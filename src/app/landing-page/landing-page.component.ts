import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,LoaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, AfterViewChecked {
  @ViewChild('serviceSection', { static: false }) serviceSection!: ElementRef;

  isHeaderVisible = false;
  isLoading = true;
  private imagesChecked = false;

  services = [
    {
      title: 'Réparation',
      description: 'Confiez votre véhicule à des experts pour une réparation complète et efficace. Nos techniciens qualifiés interviennent sur tous types de pannes mécaniques, électroniques et carrosserie, assurant un service fiable et rapide.',
      details: [
        'Mécanique : Entretien du moteur, remplacement de pièces et contrôle du freinage.',
        'Électronique : Diagnostic précis et réparation des systèmes électriques embarqués.',
        'Carrosserie : Redressement, peinture et rénovation pour une finition impeccable.',
      ],
      image: 'assets/images/service-1.jpg',
    },
    {
      title: 'Entretien',
      description: 'Garantissez la longévité et la performance de votre véhicule avec un entretien régulier. Nos services couvrent tous les aspects essentiels pour un fonctionnement optimal.',
      details: [
        'Vidange et lubrification : Changement d’huile et remplacement des filtres.',
        'Contrôle technique : Vérification des freins, des pneus et du système de refroidissement.',
        'Diagnostic complet : Inspection générale et correction des anomalies détectées.',
      ],
      image: 'assets/images/service-2.jpeg',
    },
    {
      title: 'Diagnostics complets',
      description: "Identifiez les problèmes potentiels de votre véhicule avant qu'ils ne deviennent critiques. Nos diagnostics avancés permettent une détection rapide et précise des anomalies.",
      details: [
        'Analyse moteur : Vérification des performances et identification des pannes.',
        'Systèmes électroniques : Diagnostic des capteurs, batteries et équipements électriques.',
        'Sécurité et conformité : Inspection des systèmes de freinage, direction et émissions.',
      ],
      image: 'assets/images/service-3.jpeg',
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
  }

  ngAfterViewChecked(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      this.isLoading &&
      !this.imagesChecked
    ) {
      const images = Array.from(document.images);
      const allLoaded = images.every((img) => img.complete);

      if (allLoaded) {
        this.imagesChecked = true;
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); 
        }, 2000);
      }
    }
  }

  scrollToService() {
    if (this.serviceSection) {
      this.serviceSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isHeaderVisible = scrollPosition > 500;
  }
}
