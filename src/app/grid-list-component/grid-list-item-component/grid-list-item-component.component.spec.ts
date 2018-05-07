import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListItemComponentComponent } from './grid-list-item-component.component';

describe('GridListItemComponentComponent', () => {
  let component: GridListItemComponentComponent;
  let fixture: ComponentFixture<GridListItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridListItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
