import { IChoiceItem } from './../models/choice-item';
import { MatDialog } from '@angular/material/dialog';
import { IRequestEdit } from './../models/request-edit';
import { IRequestAdd } from './../models/request-add';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangeRequestService } from '../services/change-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  requestForm = this.fb.group({
    requestId: null,
    projectName: [null, Validators.required],
    changeType: [null, Validators.required],
    requestedBy: [null, Validators.required],
    requestDate: [null, Validators.required],
    practice: [null, Validators.required],
    description: [null, Validators.required]
  });

  isSaving = false;
  faFileContract = faFileContract;
  requestId: string;

  practices: IChoiceItem[] = [
    { label: 'Aviation', value: 'Aviation' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Data Center', value: 'DataCenter' },
    { label: 'Education', value: 'Education' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Interiors', value: 'Interiors' },
    { label: 'Specialty', value: 'Specialty' }
  ];

  changeTypes: IChoiceItem[] = [
    { label: 'Scope', value: 'Scope' },
    { label: 'Cost', value: 'Cost' },
    { label: 'Schedule', value: 'Schedule' }
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestsService: ChangeRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(): void {
    const item = this.requestForm.value as IRequestAdd;
    this.isSaving = true;
    if (this.requestId) {
      this.requestsService.putRequest(this.requestId, item).subscribe(
        () => this.router.navigate(['/request-log']),
        (error) => console.log(error),
        () => this.isSaving = false
      );
    } else {
      this.requestsService.postRequest(item).subscribe(
        (request: IRequestEdit) => this.openDialog(request),
        (error) => console.log(error),
        () => this.isSaving = false
      );
    }
  }

  openDialog(data: IRequestEdit): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, { data });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/request-log']);
    });
  }

  cancel(): void {
    this.router.navigate(['/request-log']);
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { request: IRequestEdit }) => {
        if (data.request !== undefined) {
          this.requestId = data.request.requestId;
          this.requestForm.setValue(data.request);
        }
      });
  }
}
