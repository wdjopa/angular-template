import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    window["set_collection_slider"]()

  }

}
