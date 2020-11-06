import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueDetailsComponent } from './dialogue-details.component';

describe('DialogueDetailsComponent', () => {
  let component: DialogueDetailsComponent;
  let fixture: ComponentFixture<DialogueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
