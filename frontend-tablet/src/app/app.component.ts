import { Component } from '@angular/core';
import { environment } from '../environments/environment';

// Para acceder al valor de la variable
console.log(environment.apiUrl); 

@Component({
  selector: 'app-root',
  template: `
  <main>
    <header class="brand-name">
      foo bar
    </header>
    <section class="content">
      {{apiUrl}}
      <app-python-status></app-python-status>
    </section>
  </main>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-tablet';

  apiUrl = environment.apiUrl;
}
