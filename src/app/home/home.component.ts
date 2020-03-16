import { IResourceItem } from './../models/resource-item';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { faChartBar, faHdd, faRoute, faMicrochip, faSitemap, faDatabase, faDiceOne, faDiceTwo, faDiceThree } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faGithub } from '@fortawesome/free-brands-svg-icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  faChartBar = faChartBar;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Resources', cols: 2, rows: 2, items: this.getItems('Resources') },
          { title: 'Demo Walkthrough', cols: 2, rows: 1, items: this.getItems('Demo Walkthrough') },
          { title: 'Source Projects', cols: 2, rows: 1, items: this.getItems('Source') }
        ];
      }

      return [
        { title: 'Resources', cols: 1, rows: 2, items: this.getItems('Resources') },
        { title: 'Demo Walkthrough', cols: 1, rows: 1, items: this.getItems('Demo Walkthrough') },
        { title: 'Source Projects', cols: 1, rows: 1, items: this.getItems('Source') }
      ];
    })
  );

  getItems(group: string): IResourceItem[] {
    switch (group) {
      case 'Resources': {
        return [
          { title: 'Client Framework', description: '', icon: faAngular, details: 'Angular v9.0.6' },
          { title: 'UI Components', description: '', icon: faAngular, details: 'Angular Material v9.1.2' },
          { title: 'Storage', description: '', icon: faHdd, details: 'AWS S3' },
          { title: 'Networking', description: '', icon: faRoute, details: 'AWS Route 53' },
          { title: 'Serverless Computing', description: '', icon: faMicrochip, details: 'AWS Lambda' },
          { title: 'API', description: '', icon: faSitemap, details: 'AWS API Gateway (REST)' },
          { title: 'Database', description: '', icon: faDatabase, details: 'AWS DynamoDB' }
        ];
      }
      case 'Demo Walkthrough': {
        return [
          { title: 'One', description: 'Add a Request', icon: faDiceOne, details: 'Select the Add Request link from the menu. Complete all the fields, resolve validation errors, and click Submit. New Change Requests are handled by an AWS Lambda function and the API Gateway before being persisted to a DynamoDB table.' },
          { title: 'Two', description: 'Review Request Log', icon: faDiceTwo, details: 'Select the Change Request Log link from the menu. This table displays all items in a table called ChangeRequest. Icon indicators are present for the Change Type and Practice values. Selecting the Project Name will cause navigation to an Edit view.' },
          { title: 'Three', description: 'Edit Request', icon: faDiceThree, details: 'After selecting an existing item from the Change Request Log, the same form as before loads with current values. After making modifications, selecting the Save button will persist the changes.' },
        ];
      }
      case 'Source': {
        return [
          { title: 'Angular', description: '', icon: faGithub, details: 'angular-project-mgmt-demo', url: this.trustedUrl('https://github.com/Erik-Marple/angular-project-mgmt-demo') },
          { title: '.NET Core AWS Serverless', description: '', icon: faGithub, details: 'aws-lambda-dynamodb-project-mgmt-demo', url: this.trustedUrl('https://github.com/Erik-Marple/aws-lambda-dynamodb-project-mgmt-demo') }
        ];
      }
      default: {
        return [];
      }
    }
  }

  trustedUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer
    ) {}
}
