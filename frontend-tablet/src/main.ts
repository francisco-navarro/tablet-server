import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode(); // Habilita el modo de producción si corresponde
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
