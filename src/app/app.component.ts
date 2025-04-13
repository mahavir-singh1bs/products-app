import { Component, inject, Signal, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ProductListComponent,
    CopyrightDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  name = 'Alice';
  title: Signal<string> = signal('');
  currentDate = signal(new Date());

  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next('sampe');
    }, 2000);
  })

  constructor() {
    this.title$.subscribe(this.setTitle);
    this.title = computed(() => {
      return `${this.settings.title} (${this.currentDate()})`;
    })
  }

  private setTitle = () => {
    this.currentDate.set(new Date());
  };

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => {
        resolve();
      }, 2000);
    })
  }

  onInput(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }
}
