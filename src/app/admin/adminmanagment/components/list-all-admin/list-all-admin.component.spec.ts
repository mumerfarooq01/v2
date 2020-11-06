import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllAdminComponent } from './list-all-admin.component';

describe('ListAllAdminComponent', () => {
  let component: ListAllAdminComponent;
  let fixture: ComponentFixture<ListAllAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
