import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid-list-item-component',
  templateUrl: './grid-list-item-component.component.html',
  styleUrls: ['./grid-list-item-component.component.css']
})
export class GridListItemComponentComponent implements OnInit {

  @Input() private gistItem: GistModel;

  constructor() {
  }

  ngOnInit() {
  }

  openGist() {
    window.open(this.gistItem.html_url);
  }

}
