import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogeComponent } from './delete-dialoge.component';

describe('DeleteDialogeComponent', () => {
  let component: DeleteDialogeComponent;
  let fixture: ComponentFixture<DeleteDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
