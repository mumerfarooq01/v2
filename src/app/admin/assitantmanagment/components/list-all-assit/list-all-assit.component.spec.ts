import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllAssitComponent } from './list-all-assit.component';

describe('ListAllAssitComponent', () => {
  let component: ListAllAssitComponent;
  let fixture: ComponentFixture<ListAllAssitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllAssitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllAssitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
