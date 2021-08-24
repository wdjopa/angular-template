import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input('title') title: string;
  @Input('breadcrumbs') breadcrumbs: any;
  @Input("end_breadcrumb") end_breadcrumb: string;
  constructor() { }

  ngOnInit(): void {
    // console.log("breadcrumbs", this.breadcrumbs)
  }

}
