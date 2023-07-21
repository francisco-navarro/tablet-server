import { Component } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  template: `
  <main>
    <h1 class="brand-name">
      Application header
    </h1>
    <section class="content">
      <p>API express host: {{apiUrl}}</p>
      <p>is production {{production}}</p>
      <app-python-status></app-python-status>
    </section>
  </main>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-tablet';

  apiUrl = environment.apiUrl;
  production = environment.production;
}
