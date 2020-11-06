import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddNewComponent } from './list-add-new.component';

describe('ListAddNewComponent', () => {
  let component: ListAddNewComponent;
  let fixture: ComponentFixture<ListAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAddNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
