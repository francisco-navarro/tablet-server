import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <main>
    <header class="brand-name">
      foo bar
    </header>
    <section class="content">
      <app-python-status></app-python-status>
    </section>
  </main>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-tablet';
}
