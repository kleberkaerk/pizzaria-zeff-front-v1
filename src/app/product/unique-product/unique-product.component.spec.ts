import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueProductComponent } from './unique-product.component';

describe('UniqueProductComponent', () => {
  let component: UniqueProductComponent;
  let fixture: ComponentFixture<UniqueProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
