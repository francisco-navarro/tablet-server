import { Component } from '@angular/core';

@Component({
  selector: 'app-arduino',
  template: `<main>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Arduino</mat-card-title>
      </mat-card-header>
      <mat-card-content> Contenido </mat-card-content>
      <mat-card-actions>
        <button mat-button>HIDE</button>
      </mat-card-actions>
    </mat-card>
  </main>`,
  styleUrls: ['./arduino.component.scss'],
})
export class ArduinoComponent {}
