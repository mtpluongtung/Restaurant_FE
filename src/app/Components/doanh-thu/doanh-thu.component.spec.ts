/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoanhThuComponent } from './doanh-thu.component';

describe('DoanhThuComponent', () => {
  let component: DoanhThuComponent;
  let fixture: ComponentFixture<DoanhThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoanhThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
