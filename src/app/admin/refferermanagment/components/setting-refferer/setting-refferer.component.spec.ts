import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingReffererComponent } from './setting-refferer.component';

describe('SettingReffererComponent', () => {
  let component: SettingReffererComponent;
  let fixture: ComponentFixture<SettingReffererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingReffererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingReffererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
