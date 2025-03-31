import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'delete-confirmation-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Confirmation de suppression</h1>
    <div mat-dialog-content>
      <p>Etes vous sur de vouloir supprimer?</p>
    </div>
    <div mat-dialog-actions class="action">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="warn" (click)="onConfirm()">Supprimer</button>
    </div>
  `,
  imports: [CommonModule, MatButtonModule],
  styles: [
    `
    ::ng-deep .mat-mdc-dialog-surface {
      border-radius: 12px;
      padding: 30px !important;
      background-color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }
    h1 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 10px;
    }
    p {
      font-size: 1rem;
      color: #666;
      margin-bottom: 20px;
    }
    .action {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      text-transform: uppercase;
    }
    `
  ]
})
export class ConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}