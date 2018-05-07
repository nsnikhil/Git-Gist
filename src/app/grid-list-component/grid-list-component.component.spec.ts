import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListComponentComponent } from './grid-list-component.component';

describe('GridListComponentComponent', () => {
  let component: GridListComponentComponent;
  let fixture: ComponentFixture<GridListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
