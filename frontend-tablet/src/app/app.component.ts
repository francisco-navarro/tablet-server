import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <mat-toolbar>
        <span>My App</span>
        <span class="margin-right"></span>
        <button
          mat-icon-button
          class="flight-land-icon"
        >
          <mat-icon>flight_land</mat-icon>
        </button>
        <button
          mat-icon-button
          class="example-icon"
        >
          <mat-icon>memory_alt</mat-icon>
        </button>
      </mat-toolbar>
      <section class="content">
        <p>API express host: {{ apiUrl }}</p>
        <p>is production {{ production }}</p>
        <app-python-status></app-python-status>
        <app-arduino></app-arduino>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-tablet';

  apiUrl = environment.apiUrl;
  production = environment.production;
}
