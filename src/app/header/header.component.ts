import { Component, OnInit } from '@angular/core';
import {SortUtility} from '../utility/SortUtility';
import {FilterDialogComponent} from '../grid-list-component/grid-list-component.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  s/*ortArray(type) {
    switch (type) {
      case 1:
        SortUtility.sortByLastUpdated(this.gistList);
        break;
      case 2:
        SortUtility.sortByFirstUpdated(this.gistList);
        break;
      case 3:
        SortUtility.sortByName(this.gistList);
        break;
      case 4:
        SortUtility.sortByLastDescription(this.gistList);
        break;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '400px',
      data: {
        name: this.name,
        hideNoDescription: this.hideNoDescription,
        perPageCount: this.perPageCount,
        currentPage: this.currentPage,
        noOfColumns: this.noOfColumns,
        infiniteScroll: this.infiniteScroll
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.name = result.name;
      this.hideNoDescription = result.hideNoDescription;
      this.noOfColumns = result.noOfColumns;
      if (this.checkValidPage(result.currentPage, result.perPageCount)) {
        this.currentPage = result.currentPage;
        this.perPageCount = result.perPageCount;
        this.getGistList();
      }
    });
  }*/

}
