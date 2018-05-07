import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NetworkApiService} from '../network/network-api.service';

@Component({
  selector: 'app-grid-list-component',
  templateUrl: './grid-list-component.component.html',
  styleUrls: ['./grid-list-component.component.css']
})
export class GridListComponentComponent implements OnInit {

  gistList: GistModel[];
  perPageCount = 12;
  currentPage = 1;

  hideNoDescription = false;
  name: String;

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

  sortArray() {

  }


  filterResults(gist: GistModel) {
    let nameMatch: Boolean = true;
    let descriptionMatch: Boolean = true;
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
        name: this.name, hideNoDescription: this.hideNoDescription,
        perPageCount: this.perPageCount, currentPage: this.currentPage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.name = result.name;
      this.hideNoDescription = result.hideNoDescription;
      if (this.checkValidPage(result.currentPage, result.perPageCount)) {
        this.currentPage = result.currentPage;
        this.perPageCount = result.perPageCount;
        this.getGistList();
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
      this.gistList = results;
    });
  }

  changeCounter(value) {
    if (this.currentPage + value >= 1 && this.currentPage + value <= (3000 / this.perPageCount)){
      this.currentPage += value;
      this.getGistList();
    }
  }

}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: 'app-filter-dialog.component.html',
})
export class FilterDialogComponent {

  perPageItems: Number[] = [10, 12, 14, 16, 18, 20];
  perPageCount: Number = this.data.perPageCount;
  currentPage: Number = this.data.currentPage;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
