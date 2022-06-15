import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'bottom-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: any= {};
  @Output() getRequest = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(link = ""){
    this.getRequest.emit(link)
  }

}
