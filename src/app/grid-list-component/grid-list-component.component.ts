import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NetworkApiService} from '../network/network-api.service';
import {SortUtility} from '../utility/SortUtility';

@Component({
  selector: 'app-grid-list-component',
  templateUrl: './grid-list-component.component.html',
  styleUrls: ['./grid-list-component.component.css']
})
export class GridListComponentComponent implements OnInit {

  private gistList: GistModel[];
  private perPageCount = 20;
  private currentPage = 1;
  private noOfColumns = 4;
  private hideNoDescription = false;
  private infiniteScroll = false;
  private name;
  private searchEnabled = false;
  private searchTerm;
  private searchItems = [];

  constructor(public dialog: MatDialog, public networkApi: NetworkApiService) {
  }

  ngOnInit() {
    this.getGistList();
  }

  checkGreater() {
    return this.currentPage > 1;
  }

  checkSmaller() {
    return this.currentPage < (3000 / this.perPageCount);
  }

  sortArray(type) {
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

  onScroll() {
    if (this.infiniteScroll) {
      this.currentPage += 1;
      this.getGistList();
    }
  }

  changeSearch() {
    this.searchEnabled = !this.searchEnabled;
  }

  onSearch(searchVal) {
    this.searchItems = [];
    for (let i = 0, size = this.gistList.length; i < size; i++) {
      if (this.gistList[i].owner.login.includes(searchVal) || this.gistList[i].description.includes(searchVal)) {
        this.searchItems.push(this.gistList[i]);
      }
    }
  }

  filterResults(gist: GistModel) {
    let nameMatch = true;
    let descriptionMatch = true;
    if (this.name !== undefined && this.name !== '') {
      nameMatch = gist.owner.login === this.name;
    }
    if (this.hideNoDescription === true && gist.description === '') {
      descriptionMatch = false;
    }
    return nameMatch && descriptionMatch;
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
      if (result !== undefined) {
        this.name = result.name;
        this.hideNoDescription = result.hideNoDescription;
        this.noOfColumns = result.noOfColumns;
        if (this.checkValidPage(result.currentPage, result.perPageCount)) {
          this.currentPage = result.currentPage;
          this.perPageCount = result.perPageCount;
          this.getGistList();
        }
      }
    });
  }

  checkValidPage(pageNo, pageCount) {
    if (this.currentPage === pageNo && this.perPageCount === pageCount) {
      return false;
    }
    if (pageNo < 1) {
      return false;
    }
    return pageNo <= (3000 / pageCount);
  }

  getGistList() {
    this.networkApi.getData(this.currentPage, this.perPageCount).subscribe(results => {
      if (this.gistList === undefined || !this.infiniteScroll) {
        this.gistList = results;
      } else {
        for (let i = 0, size = results.length; i < size; i++) {
          this.gistList.push(results[i]);
        }
      }
    });
  }

  changeCounter(value) {
    if (this.currentPage + value >= 1 && this.currentPage + value <= (3000 / this.perPageCount)) {
      this.currentPage += value;
      this.getGistList();
    }
  }

  showPager() {
    return !(this.infiniteScroll || this.searchEnabled);
  }

}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: 'app-filter-dialog.component.html',
})
export class FilterDialogComponent {

  perPageItems: number[] = [10, 12, 14, 16, 18, 20];
  perPerCardCount: number[] = [2, 3, 4, 5];

  perPageCount: number = this.data.perPageCount;
  currentPage: number = this.data.currentPage;
  noOfColumns: number = this.data.noOfColumns;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
