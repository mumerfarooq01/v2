import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReffererComponent } from './delete-refferer.component';

describe('DeleteReffererComponent', () => {
  let component: DeleteReffererComponent;
  let fixture: ComponentFixture<DeleteReffererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReffererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReffererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
