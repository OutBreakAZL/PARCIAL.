import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InspectionsService } from './services/inspection.service';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class InspectionsComponent implements OnInit {
  inspectionForm!: FormGroup;
  plotId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private inspectionsService: InspectionsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plotId = Number(this.route.snapshot.paramMap.get('id'));
    this.inspectionForm = this.fb.group({
      plotId: [{ value: this.plotId, disabled: true }, Validators.required],
      observations: ['', Validators.required],
      recommendedActions: ['', Validators.required],
      cropStatus: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.inspectionForm.valid) {
      const inspectionData = {
        ...this.inspectionForm.getRawValue(),
        plotId: this.inspectionForm.get('plotId')?.value,
        inspectionDate: new Date().toISOString().split('T')[0], // Fecha actual en formato 'YYYY-MM-DD'
      };

      this.inspectionsService.registerInspection(inspectionData).subscribe({
        next: () => {
          if (inspectionData.cropStatus === 'Critical') {
            this.snackBar.open(
              'Critical condition detected. Immediate action required.',
              'Close',
              { duration: 3000 }
            );
          }
          this.snackBar.open('Inspection successfully registered.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
        error: () => {
          this.snackBar.open('Failed to register inspection.', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
