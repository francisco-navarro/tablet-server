import { Component } from '@angular/core';

@Component({
  selector: 'app-python-status',

  template: `
    <main>
      <mat-card>
        <mat-card-header>
          <mat-card-title>Phyton Simconnect</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>
            This is the python connector with flask in http://localhost:5000.
            The connector read simconnect variables.
            <br />
            Two examples of variables:
            <br />
            <a  target="_blank" href=
            "https://docs.flybywiresim.com/fbw-a32nx/feature-guides/autopilot-fbw/#common">Autopilot fbw</a>
            <br />
            <a  target="_blank" href=
            "https://docs.flybywiresim.com/fbw-a32nx/a32nx-api/a32nx-flightdeck-api/">Flightdeck-api</a>
          </p>
          <p>
            Express is connected with localhost:5000 by:
            <br />
            Read: fetch("http://localhost:5000/fcu") - read multiple
            <br />
            Read one:
            http://localhost:5000/read?var=(L:A32NX_AUTOPILOT_SPEED_SELECTED)
          </p>
          <h2>Status</h2>
          <div class="flex status">
            <mat-icon
              class="margin-right"
              [class.active]="processStarted"
              fontIcon="power"
            ></mat-icon>
            <mat-slide-toggle [checked]="processStarted" (change)="changeProcess()">Toggle me!</mat-slide-toggle>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>HIDE</button>
        </mat-card-actions>
      </mat-card>
    </main>
  `,
  styleUrls: ['./python-status.component.scss'],
})
export class PythonStatusComponent {
  processStarted = false;

  changeProcess() {
    this.processStarted = !this.processStarted;
  }
}
