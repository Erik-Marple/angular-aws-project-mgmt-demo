import { IRequestEdit } from './../models/request-edit';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChangeRequestService } from '../services/change-request.service';
import { IconDefinition, faPlane, faQuestionCircle, faCity, faDatabase,
  faSchool, faHospitalAlt, faSwatchbook, faDraftingCompass, faProjectDiagram,
  faCommentDollar, faBusinessTime } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['projectName', 'requestDate', 'requestedBy', 'practice'];
  data: IRequestEdit[] = [];
  isLoading = true;

  constructor(
    private requestsService: ChangeRequestService
  ) { }

  getRequests() {
    this.isLoading = true;
    this.requestsService.getRequests().subscribe(
      (requests: IRequestEdit[]) => this.data = requests,
      (error) => console.log(error),
      () => this.isLoading = false
    );
  }

  practiceIcon(practice: string): IconDefinition {
    switch (practice) {
      case 'Aviation':
        return faPlane;
      case 'Commercial':
        return faCity;
      case 'DataCenters':
        return faDatabase;
      case 'Education':
        return faSchool;
      case 'Healthcare':
        return faHospitalAlt;
      case 'Interiors':
        return faSwatchbook;
      case 'Specialty':
          return faDraftingCompass;
      default:
        return faQuestionCircle;
    }
  }

  typeIcon(changeType: string): IconDefinition {
    switch (changeType) {
      case 'Scope':
        return faProjectDiagram;
      case 'Cost':
        return faCommentDollar;
      case 'Schedule':
        return faBusinessTime;
      default:
        return faQuestionCircle;
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getRequests();
  }
}
