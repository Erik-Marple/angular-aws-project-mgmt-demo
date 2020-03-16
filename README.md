# Angular Front End for AWS Lambda / API Gateway Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Dependencies

* Angular 9.0.6
* Angular Material 9.1.2
* FontAwesome 5.12.1

## Dev Dependencies

* @jefiozie/ngx-aws-deploy 1.2.1

## Deployment

Modify deploy section angular.json to match AWS settings, including secret access key and access key id. After adding, ng deploy will publish to S3 bucket, which needs to be configured as a static website having public access applied. (Demo does not account for VPC scenarios).