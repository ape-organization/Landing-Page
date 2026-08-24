import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface TechnologyItem {
  name: string;
  shortName: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly currentYear = new Date().getFullYear();

  readonly services: ServiceItem[] = [
    {
      icon: '</>',
      title: 'Web Development',
      description:
        'Fast, scalable and secure web applications engineered around your business workflow.'
    },
    {
      icon: 'APP',
      title: 'Mobile Applications',
      description:
        'Modern mobile experiences with clean UX, reliable architecture and smooth performance.'
    },
    {
      icon: 'API',
      title: 'Backend & APIs',
      description:
        'Secure APIs, integrations and cloud-ready backend systems built to scale with your product.'
    },
    {
      icon: 'UX',
      title: 'UI / UX Design',
      description:
        'Clear interfaces and thoughtful user journeys that make complex products feel simple.'
    }
  ];

  readonly technologies: TechnologyItem[] = [
    { name: 'Angular', shortName: 'NG' },
    { name: 'ASP.NET Core', shortName: '.NET' },
    { name: 'TypeScript', shortName: 'TS' },
    { name: 'SQL Server', shortName: 'SQL' },
    { name: 'Cloud APIs', shortName: 'API' },
    { name: 'Responsive UI', shortName: 'UI' }
  ];

  readonly process: ProcessStep[] = [
    {
      number: '01',
      title: 'Discover',
      description: 'We understand your goals, users, requirements and technical constraints.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'We turn the product direction into a clear UX and a strong visual system.'
    },
    {
      number: '03',
      title: 'Develop',
      description: 'We build with maintainable architecture, secure APIs and tested components.'
    },
    {
      number: '04',
      title: 'Launch & Scale',
      description: 'We deploy, monitor, improve and keep the product ready for the next stage.'
    }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(sectionId: string): void {
    this.closeMenu();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
