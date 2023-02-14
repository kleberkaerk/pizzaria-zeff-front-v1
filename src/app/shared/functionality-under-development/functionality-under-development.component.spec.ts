import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityUnderDevelopmentComponent } from './functionality-under-development.component';

describe('FunctionalityUnderDevelopmentComponent', () => {
  let component: FunctionalityUnderDevelopmentComponent;
  let fixture: ComponentFixture<FunctionalityUnderDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalityUnderDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalityUnderDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
