import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlinkedComponent } from './editlinked.component';

describe('EditlinkedComponent', () => {
  let component: EditlinkedComponent;
  let fixture: ComponentFixture<EditlinkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlinkedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlinkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
