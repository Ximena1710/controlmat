import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoHomeComponent } from './consumo-home.component';

describe('ConsumoHomeComponent', () => {
  let component: ConsumoHomeComponent;
  let fixture: ComponentFixture<ConsumoHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoHomeComponent]
    });
    fixture = TestBed.createComponent(ConsumoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
